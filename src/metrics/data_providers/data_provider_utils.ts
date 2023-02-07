import get from "lodash/get";
import groupBy from "lodash/groupBy";
import isNil from "lodash/isNil";
import mapValues from "lodash/mapValues";
import truncate from "lodash/truncate";
import Papa from "papaparse";

import { assert } from "../../assert";
import { Region, RegionDB } from "../../regions";
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
        const date = row[dateKey];
        assert(
          typeof date === "string" ||
            (typeof date === "number" && date >= 0 && date <= 9999),
          `Date column must be an ISO 8601 date string or 4-digit year. Found: ${date}`
        );
        return {
          date: new Date(`${date}`),
          value: value as unknown,
        };
      })
      .filter((row) => !isNil(row.value))
  );
  return new MetricData(
    metric,
    region,
    timeseries.lastValue ?? null,
    timeseries.length === 0 ? undefined : timeseries
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

/**
 * Helper to group DataRows by region ID key and validate the region IDs against a regionDb.
 *
 * @param dataRows Data rows to group and validate regions for.
 * @param regionDb RegionDB to validate against.
 * @param regionKey Region column name to use for grouping and validation.
 * @param url URL to use for error messages.
 * @returns
 */
export function groupAndValidateRowsByRegionId(
  dataRows: DataRow[],
  regionDb: RegionDB,
  regionKey: string,
  url?: string
): { [regionId: string]: DataRow[] } {
  const dataRowsByRegionId = groupBy(dataRows, (row) => row[regionKey]);
  assert(
    !dataRowsByRegionId["undefined"],
    `One or more data rows were missing a region id value in column ${regionKey}`
  );

  const regionIds = Object.keys(dataRowsByRegionId);
  const unknownRegionIds = regionIds.filter(
    (regionId) => !regionDb.findByRegionId(regionId)
  );
  if (unknownRegionIds.length > 0) {
    const source = url ? `data source ${url}` : "data";
    console.warn(
      `Unrecognized region IDs encountered while parsing ${source}: ${truncate(
        unknownRegionIds.join(", "),
        { length: 200 }
      )}`
    );
    if (unknownRegionIds.length === regionIds.length) {
      throw new Error(
        `Failed to parse ${source}: All region IDs were invalid.`
      );
    }
  }
  return dataRowsByRegionId;
}

/**
 * Creates a MetricData object from a set of data rows grouped by region ID,
 * where metricField is the name of the field containing the metric value.
 *
 * @param dataRowsByRegionId Data to transform into MetricData.
 * @param region Region to get MetricData for.
 * @param metric Metric to get MetricData for.
 * @param dateField Name of field containing date values.
 * @returns MetricData for the provided region and metric.
 */
export async function getMetricDataFromDataRows(
  dataRowsByRegionId: { [regionId: string]: DataRow[] },
  region: Region,
  metric: Metric,
  metricField: string,
  dateField?: string,
  strict = true
): Promise<MetricData<unknown>> {
  let metricData: MetricData;
  if (dateField) {
    metricData = dataRowsToMetricData(
      dataRowsByRegionId,
      region,
      metric,
      metricField,
      dateField,
      /* strict= */ strict
    );
  } else {
    metricData = dataRowToMetricData(
      dataRowsByRegionId,
      region,
      metric,
      metricField
    );
  }
  return metricData;
}

/**
 * Transforms data from long-format to wide-format.
 *
 * @param long Data in long-format, grouped by region ID.
 * @param variableField Name of field containing variable names.
 * @param valueField Name of field containing variable values.
 * @param dateField Name of field containing date values.
 * @returns Data transformed to wide-format, grouped by region ID.
 */
export function pivotLongToWide(
  long: { [regionId: string]: DataRow[] },
  variableField: string,
  valueField: string,
  dateField?: string
): { [regionId: string]: DataRow[] } {
  const regionToWideRows = mapValues(long, (longRows) => {
    if (dateField) {
      const dateToLongRows = groupBy(longRows, (row) => row[dateField]);
      const wideRows = Object.entries(dateToLongRows).map(
        ([date, longRowsForDate]) => {
          const wideRow: DataRow = { [dateField]: date };
          for (const row of longRowsForDate) {
            wideRow[row[variableField] as string] = row[valueField];
          }
          return wideRow;
        }
      );
      return wideRows;
    } else {
      const wideRow: DataRow = {};
      for (const row of longRows) {
        wideRow[row[variableField] as string] = row[valueField];
      }
      return [wideRow];
    }
  });
  return regionToWideRows;
}
