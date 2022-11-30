import get from "lodash/get";
import isNil from "lodash/isNil";
import Papa from "papaparse";

import { assert } from "@actnowcoalition/assert";
import { Region } from "@actnowcoalition/regions";

import { Metric } from "../Metric";
import { Timeseries } from "../Timeseries";
import { MetricData } from "../data";

/**
 * Represents a "row" of data (e.g. as read from a CSV), with key-value pairs
 * representing the values in the row, indexed by column name.
 */
export type DataRow = { [key: string]: unknown };

/**
 * Parse non-timeseries raw data-rows into MetricData for specified region and metric.
 *
 * Expects exactly one row in dataRowsByRegionId for the specified region.
 *
 * @param dataRowsByRegionId Region-indexed dictionary of data to transform.
 * @param region Region to parse data for.
 * @param metric Metric to parse data for.
 * @param metricKey Key name of the items in the data-rows containing the metric values.
 * @returns Metric Data for the specified region and metric.
 */
export function dataRowToMetricData(
  dataRowsByRegionId: { [regionId: string]: DataRow[] },
  region: Region,
  metric: Metric,
  metricKey: string
) {
  const rows = dataRowsByRegionId[region.regionId] ?? [];
  if (rows.length === 0) {
    return new MetricData(metric, region, /*currentValue=*/ null);
  } else {
    assert(
      rows.length === 1,
      `Expected no more than 1 entry for region ${region.regionId} and metric ` +
        `${metric.id} but found: ${rows.length}. If this is timeseries data, ` +
        `specify a dateColumn when creating the CsvDataProvider.`
    );
    const value = get(rows[0], metricKey);
    assert(value !== undefined, `Metric key ${metricKey} missing.`);
    return new MetricData(metric, region, value);
  }
}

/**
 * Parse timeseries raw data-rows into MetricData for specified region and metric.
 *
 * @param dataRowsByRegionId Region-indexed dictionary of data to transform.
 * @param region Region to parse data for.
 * @param metric Metric to parse data for.
 * @param metricKey Key name of the items in the data-rows containing the metric values.
 * @param dateKey Key name of the items in the data-rows that contain the date-time values.
 * @param strict If true, will throw an error if any field is missing in any row.
 * @returns Metric Data for the specified region and metric.
 */
export function dataRowsToMetricData(
  dataRowsByRegionId: { [regionId: string]: DataRow[] },
  region: Region,
  metric: Metric,
  metricKey: string,
  dateKey: string,
  strict = false
) {
  const rows = dataRowsByRegionId[region.regionId] ?? [];
  const timeseries = new Timeseries(
    rows
      .map((row) => {
        const value = get(row, metricKey);
        if (strict) {
          assert(value !== undefined, `Metric key ${metricKey} missing.`);
        }
        assert(
          typeof row[dateKey] === "string",
          `Date column must be a string. ${typeof row[dateKey]} found.`
        );
        return {
          date: new Date(row[dateKey] as string),
          value: value as unknown,
        };
      })
      .filter((row) => !isNil(row.value))
  );
  return new MetricData(
    metric,
    region,
    timeseries.lastValue ?? null,
    timeseries
  );
}

/**
 * Transforms CSV text from string to an array of objects, each representing a
 * row in the CSV.
 *
 * By default number-like values (2, 2.1E5, etc.) will be parsed into `number` types
 * rather than `string`. All other values will remain `string`. See `stringColumns`
 * parameter for adjusting this behavior.
 *
 * Empty values (",," in the CSV) will be parsed as `null`.
 *
 * @param csvText CSV text to parse.
 * @param stringColumns A list of columns that should be preserved with their raw
 * string values (without trying to coerce number-like values into numbers).
 * @returns Parsed CSV rows.
 */
export function parseCsv(
  csvText: string,
  stringColumns: string[] = []
): DataRow[] {
  const csv = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  const data = csv.data as DataRow[];
  sanitizeRows(data, stringColumns);
  return data;
}

/**
 * Sanitize CSV rows, turning numeric strings into numbers.
 *
 * @param rows Raw CSV rows.
 * @returns Sanitized CSV rows.
 */
function sanitizeRows(rows: DataRow[], excludeColumns: string[]): void {
  for (const row of rows) {
    for (const c in row) {
      if (excludeColumns.includes(c)) {
        continue;
      }
      const v = row[c] as string;
      if (v.length === 0) {
        row[c] = null;
      } else if (/^-?[\d.eE]+$/.test(v)) {
        const num = Number.parseFloat(v.replace(/,/g, ""));
        if (!Number.isNaN(num)) {
          row[c] = num;
        }
      }
    }
  }
}

/**
 * Generates CSV text representing the provided data rows.
 *
 * @param rows The rows of data (as an array of key-value objects representing
 * the column values in each row).
 * @returns The generated text of the CSV.
 */
export function generateCsv(rows: DataRow[]): string {
  // TODO(michael): It feels lame to write my own CSV serializer, but I can't
  // find a ready-to-use package that looks suitable.
  if (rows.length === 0) {
    return "";
  }
  const columns = getAllColumnsFromRows(rows);
  const headerRow = generateCsvRow(columns);
  const outputRows = rows.map((row) =>
    generateCsvRow(columns.map((c) => row[c]))
  );
  return [headerRow, ...outputRows].join("\n");
}

/**
 * Helper to generate the CSV text for a single row (as an array of values) in a
 * CSV file.
 */
function generateCsvRow(values: unknown[]): string {
  const csvValues = values.map((value) => generateCsvValue(value));
  return csvValues.join(",");
}

/**
 * Helper to generate a properly quoted/escaped string value of a single value
 * to be written to a CSV.
 */
function generateCsvValue(value: unknown): string {
  if (value === null || value === undefined) {
    return "";
  } else if (typeof value === "string" && /[,"\n\r]/.test(value)) {
    // In CSV files to include a " char in a string, you have to escape it as "" and
    // then wrap the entire string in " chars. https://stackoverflow.com/a/769820
    return `"${value.replace(/"/g, '""')}"`;
  } else {
    assert(
      ["number", "boolean", "string"].includes(typeof value),
      `Unexpected value found while generating CSV text: ${JSON.stringify(
        value
      )}`
    );
    return `${value}`;
  }
}

/** Helper to iterate all rows and find all the columns contained in them. */
function getAllColumnsFromRows(rows: DataRow[]): string[] {
  const columns = new Set<string>();
  for (const row of rows) {
    for (const column in row) {
      columns.add(column);
    }
  }
  return [...columns];
}
