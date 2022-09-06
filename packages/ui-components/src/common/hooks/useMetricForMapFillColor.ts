import { useMetricCatalog } from "../../components/MetricCatalogContext";
import { Metric } from "@actnowcoalition/metrics";
import { Region } from "@actnowcoalition/regions";

export default function useMetricForMapFillColor(
  metricOrId: Metric | string,
  region: Region
): string {
  const metricCatalog = useMetricCatalog();

  const metric =
    typeof metricOrId === "string"
      ? metricCatalog.getMetric(metricOrId)
      : metricOrId;

  const { data } = metricCatalog.useData(region, metric);
  const currentValue = data?.currentValue;

  return currentValue ? metric.getColor(currentValue) : "white";
}
