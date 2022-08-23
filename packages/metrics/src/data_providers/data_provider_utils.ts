import { assert } from "@actnowcoalition/assert";
import { Region } from "@actnowcoalition/regions";
import { Metric } from "../Metric";
import { MetricData } from "../data";
import { Timeseries } from "../Timeseries";
import { parseDateString } from "@actnowcoalition/time-utils";

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
  const rows = dataRowsByRegionId[region.regionId];
  assert(
    rows.length === 1,
    `Expected exactly 1 entry for region ${region.regionId} and metric ${metric.id} but found: ${rows.length}`
  );
  const value = rows[0][metricKey];
  assert(value !== undefined, `Metric key ${metricKey} missing.`);
  return new MetricData(metric, region, value);
}

/**
 * Parse timeseries raw data-rows into MetricData for specified region and metric.
 *
 * @param dataRowsByRegionId Region-indexed dictionary of data to transform.
 * @param region Region to parse data for.
 * @param metric Metric to parse data for.
 * @param metricKey Key name of the items in the data-rows containing the metric values.
 * @param dateKey Key name of the items in the data-rows that contain the date-time values.
 * @returns Metric Data for the specified region and metric.
 */
export function dataRowsToMetricData(
  dataRowsByRegionId: { [regionId: string]: DataRow[] },
  region: Region,
  metric: Metric,
  metricKey: string,
  dateKey: string
) {
  const rows = dataRowsByRegionId[region.regionId];
  assert(rows, `No data found for region ${region.regionId}.`);
  const timeseries = new Timeseries(
    rows.map((row) => {
      assert(row[metricKey] !== undefined, `Metric key ${metricKey} missing.`);
      assert(
        typeof row[dateKey] === "string",
        `Date column must be a string. ${typeof row[dateKey]} found.`
      );
      return {
        date: stripTime(parseDateString(row[dateKey] as string)),
        value: row[metricKey] as unknown,
      };
    })
  );
  return new MetricData(
    metric,
    region,
    timeseries.last?.value ?? null,
    timeseries
  );
}

/**
 * Remove hours minutes and seconds from Javascript Date object.
 *
 * TODO: Merge this logic with Timeseries.isoDateString() and move to time-utils package.
 *
 * @param date Date object to truncate.
 */
function stripTime(date: Date): Date {
  const truncatedDate = date.toISOString().split("T")[0];
  return new Date(truncatedDate);
}