import { schemeCategory10 } from "d3-scale-chromatic";

import { Metric } from "@actnowcoalition/metrics";
import { Region } from "@actnowcoalition/regions";

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
