import { Dot, PlaceholderDot } from "./MetricDot.style";

import { Metric } from "@actnowcoalition/metrics";
import React from "react";
import { Region } from "@actnowcoalition/regions";
import { useData } from "../../common/hooks";
import { useMetricCatalog } from "../MetricCatalogContext";

export interface MetricDotProps {
  /** Region for which we want to represent the current category */
  region: Region;
  /** Metric for which we want to represent the current category */
  metric: Metric | string;
}

/**
 * The MetricDot component shows a colored dot that represents the current
 * category for a given metric and region. The component is still rendered for
 * metrics that don't have categories to keep spacing and alignment consistent
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
