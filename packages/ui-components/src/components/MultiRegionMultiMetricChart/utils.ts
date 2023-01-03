import * as d3ScaleChromatic from "d3-scale-chromatic";

import { DateRange, Metric } from "@actnowcoalition/metrics";
import { Region } from "@actnowcoalition/regions";
import { TimeUnit, subtractTime } from "@actnowcoalition/time-utils";

import { Series, SeriesType } from "../SeriesChart";

// TODO (Pablo): Ideally we should be able to import just the scale we need
// with `import { schemeCategory10 } from "d3-scale-chromatic"`, but Next
// has a bug that doesn't allow to import modules that only export ES modules
// (and not CommonJS modules).
const { schemeCategory10 } = d3ScaleChromatic;

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
