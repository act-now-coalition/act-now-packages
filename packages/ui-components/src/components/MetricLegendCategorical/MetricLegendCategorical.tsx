import React from "react";
import LegendCategorical from "../LegendCategorical/LegendCategorical";
import { Metric } from "@actnowcoalition/metrics";
import { assert } from "@actnowcoalition/assert";
import { useMetricCatalog } from "../MetricCatalogContext";
import { MetricCategory } from "packages/metrics/dist/Metric/MetricCategory";

export interface MetricLegendCategoricalProps {
  metric: Metric | string;
  orientation?: "horizontal" | "vertical";
}

const getItemColor = (item: MetricCategory) => item.color;
const getItemLabel = (item: MetricCategory) => item.label;

const MetricLegendCategorical = ({
  metric,
  orientation,
}: MetricLegendCategoricalProps) => {
  const metricCatalog = useMetricCatalog();
  const resolvedMetric =
    typeof metric === "string" ? metricCatalog.getMetric(metric) : metric;
  const items = resolvedMetric.categories;
  assert(
    items,
    "Metric must define categories in order to use MetricLegendCategorical" +
      `No categories found for metric ${metric.toString()}`
  );

  return (
    <LegendCategorical
      items={items}
      getItemColor={getItemColor}
      getItemLabel={getItemLabel}
      orientation={orientation}
    />
  );
};

export default MetricLegendCategorical;
