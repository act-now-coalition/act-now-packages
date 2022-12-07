import { Metric } from "@actnowcoalition/metrics";
import { Region } from "@actnowcoalition/regions";

import { Series, SeriesType } from "../SeriesChart";

export function getMetricSeries(metric: Metric, regions: Region[]): Series[] {
  return regions.map((region) => ({
    metric,
    region,
    type: SeriesType.LINE,
    label: region.shortName,
  }));
}
