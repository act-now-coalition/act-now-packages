/** Returns color associated with a metric's current value for a region. */

import { Metric, MetricCatalog } from "@actnowcoalition/metrics";
import { RegionDB, states, counties, metros } from "@actnowcoalition/regions";

export default function getMetricMapFillColor(
  metricCatalog: MetricCatalog,
  metricOrId: Metric | string,
  regionId: string
): string {
  const usRegions = new RegionDB([
    ...states.all,
    ...counties.all,
    ...metros.all,
  ]);

  const region = usRegions.findByRegionIdStrict(regionId);

  const metric = metricCatalog.getMetric(metricOrId);

  const { data } = metricCatalog.useData(region, metric);
  const currentValue = data?.currentValue;

  return currentValue ? metric.getColor(currentValue) : "white";
}
