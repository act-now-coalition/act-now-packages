import React from "react";
import { LegendThresholdVertical } from "../LegendThreshold/LegendThresholdVertical";
import { LegendThresholdHorizontal } from "../LegendThreshold/LegendThresholdHorizontal";

import { Metric } from "@actnowcoalition/metrics";
import { useMetricCatalog } from "../MetricCatalogContext";
import { assert } from "@actnowcoalition/assert";

function getItemColor(item: number, itemIndex: number) {
  console.log(item, itemIndex);
  return "#999";
}

export type MetricLegendThresholdProps = {
  metric: Metric | string;
  orientation: "vertical" | "horizontal";
};

const MetricLegendThreshold = (props: MetricLegendThresholdProps) => {
  const metricCatalog = useMetricCatalog();
  const metric = metricCatalog.getMetric(props.metric);
  const items = metric.thresholds;
  assert(
    items,
    "Metric must have thresholds to use MetricLegendThreshold." +
      `No thresholds found for metric ${metric.id}.`
  );

  return props.orientation === "horizontal" ? (
    <LegendThresholdHorizontal<number>
      {...props}
      {...{
        getItemColor: getItemColor,
        orientation: "horizontal",
        items: items,
      }}
    />
  ) : (
    <LegendThresholdVertical<number>
      {...props}
      {...{ getItemColor: getItemColor, orientation: "vertical", items: items }}
    />
  );
};

export default MetricLegendThreshold;
