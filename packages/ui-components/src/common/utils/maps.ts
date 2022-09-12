/** Returns color associated with a metric's current value for a region. */

import { Metric, MetricCatalog } from "@actnowcoalition/metrics";
import { RegionDB, states, counties, metros } from "@actnowcoalition/regions";

export function getMetricMapFillColor(
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

/** Checks if a county or congressional district belongs to a given state */

export function belongsToState(
  countyOrCongressionalDistrictFips: string,
  stateFips: string
) {
  return countyOrCongressionalDistrictFips.substring(0, 2) === stateFips;
}
