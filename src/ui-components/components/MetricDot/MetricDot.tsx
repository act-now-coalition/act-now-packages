import React from "react";

import { Metric } from "src/metrics";
import { Region } from "src/regions";

import { useData } from "../../common/hooks";
import { useMetricCatalog } from "../MetricCatalogContext";
import { Dot, PlaceholderDot } from "./MetricDot.style";

export interface MetricDotProps {
  /**
   * Region represented by the dot.
   */
  region: Region;
  /**
   * Metric represented by the dot.
   */
  metric: Metric | string;
}

/**
 * MetricDot is a colored dot that represents the current category for
 * a given metric and region. A transparent PlaceholderDot is rendered for metrics
 * that don't have categories in order to keep spacing and alignment consistent
 * across metrics.
 */

export const MetricDot = ({ region, metric: metricOrId }: MetricDotProps) => {
  const metricCatalog = useMetricCatalog();
  const metric = metricCatalog.getMetric(metricOrId);
  const { data, error } = useData(region, metric, /*includeTimeseries=*/ false);

  if (!metric.hasCategories || error || !data) {
    return <PlaceholderDot />;
  }

  // TODO: Find out accessibility best practices for this component
  const backgroundColor = metric.getColor(data.currentValue);
  return <Dot style={{ backgroundColor }} />;
};
