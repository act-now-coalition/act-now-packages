import { Metric, MetricCatalog } from "@actnowcoalition/metrics";
import { Region } from "@actnowcoalition/regions";

/** Returns color associated with a metric's current value for a region. */
export function getMetricMapFillColor(
  metricCatalog: MetricCatalog,
  metricOrId: Metric | string,
  region: Region
): string {
  const metric = metricCatalog.getMetric(metricOrId);
  const { data } = metricCatalog.useData(region, metric);
  const currentValue = data?.currentValue;
  return currentValue ? metric.getColor(currentValue) : "lightGray";
}

/** Checks if a county or congressional district belongs to a given state */
export function belongsToState(
  countyOrCongressionalDistrictFips: string,
  stateFips: string
) {
  return countyOrCongressionalDistrictFips.substring(0, 2) === stateFips;
}
