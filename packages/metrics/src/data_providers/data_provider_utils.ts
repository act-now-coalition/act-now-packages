import { assert } from "@actnowcoalition/assert";
import { Region } from "@actnowcoalition/regions";
import { Metric } from "../Metric";
import { MetricData } from "../data";
import Papa from "papaparse";
import { Timeseries } from "../Timeseries";
import { Dictionary } from "lodash";
import {
  DateFormat,
  formatUTCDateTime,
  parseDateString,
} from "@actnowcoalition/time-utils";

export type DataRow = { [key: string]: unknown };

export function dataRowsToMetricData(
  rowsDictionary: Dictionary<DataRow[]>,
  region: Region,
  metric: Metric,
  includeTimeseries: boolean,
  dateColumn?: string
) {
  const rows = rowsDictionary[region.regionId];
  assert(rows, `No data found for region ${region.regionId}`);
  if (!dateColumn) {
    assert(
      rows.length === 1,
      `Duplicate or no entries for region ${region.regionId} and metric ${metric.id} found.`
    );
    const value = rows[0][metric.id];
    const timeseries = includeTimeseries
      ? new Timeseries([
          {
            date: new Date(
              formatUTCDateTime(new Date(), DateFormat.YYYY_MM_DD)
            ),
            value: value,
          },
        ])
      : undefined;
    return new MetricData(metric, region, value, timeseries);
  }
  assert(
    rows.every((row) => typeof row[dateColumn] === "string"),
    `Not all rows have a valid date-string in column ${dateColumn}.`
  );
  const timeseries = new Timeseries(
    rows.map((row) => ({
      date: new Date(
        formatUTCDateTime(
          parseDateString(row[dateColumn] as string),
          DateFormat.YYYY_MM_DD
        )
      ),
      value: row[metric.id] as unknown,
    }))
  );
  return new MetricData(
    metric,
    region,
    timeseries.last?.value ?? null,
    includeTimeseries ? timeseries : undefined
  );
}

export async function fetchCsv(url: string): Promise<DataRow[]> {
  const response = await fetch(url);
  const text = await response.text();
  const csv = Papa.parse(text, {
    header: true,
    dynamicTyping: true,
  });
  return csv.data as DataRow[];
}
