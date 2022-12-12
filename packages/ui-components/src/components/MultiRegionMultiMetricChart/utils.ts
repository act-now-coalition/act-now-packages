import { schemeCategory10 } from "d3-scale-chromatic";

import { DateRange, Metric } from "@actnowcoalition/metrics";
import { Region } from "@actnowcoalition/regions";
import { TimeUnit, subtractTime } from "@actnowcoalition/time-utils";

import { Series, SeriesType } from "../SeriesChart";

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
  label: string;
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
