import React from "react";
import { LegendThresholdVertical } from "../LegendThreshold/LegendThresholdVertical";
import { LegendThresholdHorizontal } from "../LegendThreshold/LegendThresholdHorizontal";

import { Metric, MetricLevel } from "@actnowcoalition/metrics";
import { useMetricCatalog } from "../MetricCatalogContext";
import { assert } from "@actnowcoalition/assert";
import { Stack, Typography } from "@mui/material";

const getItemColor = (item: MetricLevel) => item.color;
const getItemLabel = (item: MetricLevel) => item.name ?? item.id;
const getItemSubLabel = () => "sublabel text";

export type MetricLegendThresholdProps = {
  metric: Metric | string;
  orientation: "vertical" | "horizontal";
  supportingText: string;
  height?: number;
  barHeight?: number;
  width?: number;
  borderRadius?: number;
  showLabels?: boolean;
};

const MetricLegendThreshold = (props: MetricLegendThresholdProps) => {
  const metricCatalog = useMetricCatalog();
  const metric = metricCatalog.getMetric(props.metric);
  const items = metric.levelSet?.levels;
  assert(
    items,
    "Metric must have thresholds to use MetricLegendThreshold." +
      `No thresholds found for metric ${metric.id}.`
  );

  const legendThreshold =
    props.orientation === "horizontal" ? (
      <LegendThresholdHorizontal<MetricLevel>
        {...props}
        {...{
          metric,
          getItemColor: getItemColor,
          orientation: "horizontal",
          items: items,
          getItemLabel: getItemLabel,
        }}
      />
    ) : (
      <LegendThresholdVertical<MetricLevel>
        {...props}
        {...{
          metric,
          getItemColor: getItemColor,
          getItemLabel: getItemLabel,
          getItemSublabel: getItemSubLabel,
          orientation: "vertical",
          items: items,
        }}
      />
    );

  return (
    <Stack spacing={props.orientation === "horizontal" ? 2 : 3}>
      <Stack spacing={0.5}>
        <Typography variant="labelLarge">{metric.name}</Typography>
        <Typography variant="paragraphSmall">{props.supportingText}</Typography>
      </Stack>
      {legendThreshold}
    </Stack>
  );
};

export default MetricLegendThreshold;
