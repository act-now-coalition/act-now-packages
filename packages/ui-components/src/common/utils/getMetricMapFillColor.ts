/** Returns color associated with a metric's current value for a region. */

import { Metric, MetricCatalog } from "@actnowcoalition/metrics";
import { RegionDB, states, counties, metros } from "@actnowcoalition/regions";
import { useData } from "../hooks";

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

  // TODO(michael): This function should be renamed to useMetricMapFillColor()
  // since it is using hooks, but that causes additional rules-of-hooks failures
  // so leaving it as is for now.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data } = useData(region, metric);
  const currentValue = data?.currentValue;

  return currentValue ? metric.getColor(currentValue) : "white";
}
