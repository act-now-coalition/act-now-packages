import { assert } from "@actnowcoalition/assert";
import { Region } from "@actnowcoalition/regions";
import { Metric } from "../Metric";
import { MetricData } from "../data";
import { Timeseries } from "../Timeseries";
import { Dictionary } from "lodash";
import { parseDateString } from "@actnowcoalition/time-utils";

export type DataRow = { [key: string]: unknown };

/**
 * Parse raw data-rows into MetricData for specified region and metric.
 *
 * @param dataRowsByRegionId Region-indexed dictionary of data to transform.
 * @param region Region to parse data for.
 * @param metric Metric to parse data for.
 * @param includeTimeseries Whether to create a timeseries.
 * @param dateKey Key name of the items in the data-rows that contain the date-time values.
 * @returns Metric Data for the specified region and metric.
 */
export function dataRowsToMetricData(
  dataRowsByRegionId: Dictionary<DataRow[]>,
  region: Region,
  metric: Metric,
  includeTimeseries: boolean,
  dateKey?: string
) {
  const metricColumn = metric.dataReference?.column;
  assert(
    typeof metricColumn === "string",
    "Missing or invalid metric column name. Ensure 'column' is included in metric's MetricDataReference"
  );
  const rows = dataRowsByRegionId[region.regionId];
  assert(rows, `No data found for region ${region.regionId}.`);
  if (!dateKey) {
    assert(
      rows.length === 1,
      `Expected exactly 1 entry for region ${region.regionId} and metric ${metric.id} but found: ${rows.length}`
    );
    const value = rows[0][metricColumn];
    assert(
      value !== undefined,
      `No data for region ${region.regionId} and metric ${metric.id} found.`
    );
    return new MetricData(metric, region, value, /**_timeseries=*/ undefined);
  }
  assert(
    rows.every((row) => typeof row[dateKey] === "string"),
    `Not all rows have a valid date-string in column ${dateKey}.`
  );
  const timeseries = new Timeseries(
    rows.map((row) => {
      assert(
        row[metricColumn] !== undefined,
        `No data for region ${region.regionId} and metric ${metric.id} found.`
      );
      return {
        date: stripTime(parseDateString(row[dateKey] as string)),
        value: row[metricColumn] as unknown,
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
 * Remove hours minutes and seconds from Javascript Date object.
 *
 * @param date Date object to truncate.
 */
function stripTime(date: Date): Date {
  const truncatedDate = date.toISOString().split("T")[0];
  return new Date(truncatedDate);
}
