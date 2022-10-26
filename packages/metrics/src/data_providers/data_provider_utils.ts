import { assert } from "@actnowcoalition/assert";
import { Region } from "@actnowcoalition/regions";
import { Metric } from "../Metric";
import { MetricData } from "../data";
import { Timeseries } from "../Timeseries";
import get from "lodash/get";
import isNil from "lodash/isNil";

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
