import React from "react";
import { Region } from "@actnowcoalition/regions";
import { Metric } from "@actnowcoalition/metrics";
import { useMetricCatalog } from "../MetricCatalogContext";
import { Dot, PlaceholderDot } from "./MetricDot.style";

export interface MetricDotProps {
  /** Region for which we want to represent the current level */
  region: Region;
  /** Metric for which we want to represent the current level */
  metric: Metric | string;
}

/**
 * The MetricDot component shows a colored dot that represents the current level
 * or category for a given metric and region. The component is still rendered
 * for metrics that don't have levels or categories to keep spacing and
 * alignment consistent across metrics.
 */
const MetricDot: React.FC<MetricDotProps> = ({
  region,
  metric: metricOrId,
}) => {
  const metricCatalog = useMetricCatalog();
  // TODO: Maybe add a method to the metricCatalog?
  const metric =
    typeof metricOrId === "string"
      ? metricCatalog.getMetric(metricOrId)
      : metricOrId;

  if (!(metric.levelSet || metric.categories)) {
    return <PlaceholderDot />;
  }

  const { data, error } = metricCatalog.useData(region, metric);
  if (error || !data) {
    return <PlaceholderDot />;
  }

  // TODO: Find out accessibility best practices for this component
  const backgroundColor = metric.getColor(data.currentValue);
  return <Dot style={{ backgroundColor }} />;
};

export default MetricDot;
