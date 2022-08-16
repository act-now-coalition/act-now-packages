import { assert } from "@actnowcoalition/assert";
import { Region } from "@actnowcoalition/regions";
import { Metric } from "../Metric";
import { MetricData } from "../data";
import Papa from "papaparse";
import { Timeseries } from "../Timeseries";
import { Dictionary } from "lodash";
import { parseDateString } from "@actnowcoalition/time-utils";

export type DataRow = { [key: string]: unknown };

/**
 * Parse raw data-rows into MetricData for specified region and metric.
 *
 * @param rowsDictionary Region-indexed dictionary of data to transform.
 * @param region Region to parse data for.
 * @param metric Metric to parse data for.
 * @param includeTimeseries Whether to create a timeseries.
 * @param dateKey Key name of the items in the data-rows that contain the date-time values.
 * @returns Metric Data for the specified region and metric.
 */
export function dataRowsToMetricData(
  rowsDictionary: Dictionary<DataRow[]>,
  region: Region,
  metric: Metric,
  includeTimeseries: boolean,
  dateKey?: string
) {
  const rows = rowsDictionary[region.regionId];
  assert(rows, `No data found for region ${region.regionId}`);
  if (!dateKey) {
    assert(
      rows.length === 1,
      `Duplicate or no entries for region ${region.regionId} and metric ${metric.id} found.`
    );
    const value = rows[0][metric.id];
    assert(
      value !== undefined,
      "Entry for metric for region ${region.regionId} and metric ${metric.id} found."
    );
    const timeseries = includeTimeseries
      ? new Timeseries([
          {
            date: stripTime(new Date()),
            value: value,
          },
        ])
      : undefined;
    return new MetricData(metric, region, value, timeseries);
  }
  assert(
    rows.every((row) => typeof row[dateKey] === "string"),
    `Not all rows have a valid date-string in column ${dateKey}.`
  );
  const timeseries = new Timeseries(
    rows.map((row) => {
      assert(
        row[metric.id] !== undefined,
        "Entry for metric for region ${region.regionId} and metric ${metric.id} found."
      );
      return {
        date: stripTime(parseDateString(row[dateKey] as string)),
        value: row[metric.id] as unknown,
      };
    })
  );
  return new MetricData(
    metric,
    region,
    timeseries.last?.value ?? null,
    includeTimeseries ? timeseries : undefined
  );
}

/**
 * Fetches data from a URL and parses it as JSON.
 *
 * @param url URL to fetch data from.
 * @returns Fetched CSV data.
 */
export async function fetchCsv(url: string): Promise<DataRow[]> {
  const response = await fetch(url);
  const text = await response.text();
  const csv = Papa.parse(text, {
    header: true,
    dynamicTyping: true,
  });
  return csv.data as DataRow[];
}

/**
 * Remove hours minutes and seconds from Javascript Date object.
 *
 * @param date Date object to truncate.
 */
function stripTime(date: Date): Date {
  const truncatedDate = date.toISOString().split("T")[0];
  return new Date(truncatedDate);
}
