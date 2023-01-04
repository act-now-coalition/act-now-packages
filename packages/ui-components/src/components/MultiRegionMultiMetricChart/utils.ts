import { DateRange, Metric } from "@actnowcoalition/metrics";
import { Region } from "@actnowcoalition/regions";
import { TimeUnit, subtractTime } from "@actnowcoalition/time-utils";

import { Series, SeriesType } from "../SeriesChart";

// These colors come are from d3-scale-chromatic, but importing them directly
// causes Next to crash because d3-scale-chromatic is a pure ES module.
// See https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c#im-having-problems-with-esm-and-typescript
const schemeCategory10 = [
  "#1f77b4",
  "#ff7f0e",
  "#2ca02c",
  "#d62728",
  "#9467bd",
  "#8c564b",
  "#e377c2",
  "#7f7f7f",
  "#bcbd22",
  "#17becf",
];

export function getMetricSeries(metric: Metric, regions: Region[]): Series[] {
  return regions.map((region, index) => ({
    metric,
    region,
    type: SeriesType.LINE,
    label: region.shortName,
    lineProps: {
      stroke: schemeCategory10[index % schemeCategory10.length],
    },
  }));
}

export interface TimePeriod {
  /** Label to show in the dropdown */
  label: string;
  /**
   * Date range to filter the series by. If undefined, it doesn't
   * filter the timeseries.
   * */
  dateRange?: DateRange;
}

export function getDefaultTimePeriods(date: Date): TimePeriod[] {
  return [
    {
      label: "60",
      dateRange: { startAt: subtractTime(date, 60, TimeUnit.DAYS) },
    },
    {
      label: "180",
      dateRange: { startAt: subtractTime(date, 180, TimeUnit.DAYS) },
    },
    { label: "All time", dateRange: undefined },
  ];
}
