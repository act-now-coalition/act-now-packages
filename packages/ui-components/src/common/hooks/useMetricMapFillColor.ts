/** Returns color associated with a metric's current value for a region. */
import { Metric, MetricCatalog } from "@actnowcoalition/metrics";
import { Region } from "@actnowcoalition/regions";
import { useData } from "../hooks";

export default function useMetricMapFillColor(
  metricCatalog: MetricCatalog,
  metricOrId: Metric | string,
  region: Region
): string {
  const metric = metricCatalog.getMetric(metricOrId);
  const { data } = useData(region, metric);
  const currentValue = data?.currentValue;
  return currentValue ? metric.getColor(currentValue) : "lightGray";
}
