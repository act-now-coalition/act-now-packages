import { Metric, MetricCatalog } from "@actnowcoalition/metrics";
import { Region } from "@actnowcoalition/regions";
import { useData } from "../hooks";

/** Returns color associated with a metric's current value for a region. */
export function getMetricMapFillColor(
  metricCatalog: MetricCatalog,
  metricOrId: Metric | string,
  region: Region
): string {
  const metric = metricCatalog.getMetric(metricOrId);
  // TODO(michael): getMetricMapFillColor() should be renamed to
  // useMetricMapFillColor() since it calls hooks and is therefore a custom hook
  // itself. But that causes additional issues, so I'm leaving it as-is for now.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data } = useData(region, metric);
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
