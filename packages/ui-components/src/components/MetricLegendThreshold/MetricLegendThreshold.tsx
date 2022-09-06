import React from "react";
import { LegendThreshold } from "../LegendThreshold";
import { Metric, MetricLevel } from "@actnowcoalition/metrics";
import { useMetricCatalog } from "../MetricCatalogContext";
import { assert } from "@actnowcoalition/assert";
import { Stack, Typography } from "@mui/material";

const getItemColor = (item: MetricLevel) => item.color;
const getItemLabel = (item: MetricLevel) => item.name ?? item.id;
const getItemSublabel = (item: MetricLevel) => item.description ?? ""; // TODO: add sub-label/description to MetricLevel

export type MetricLegendThresholdProps = {
  metric: Metric | string;
  orientation: "vertical" | "horizontal";
  supportingText?: string;
  height?: number;
  barHeight?: number;
  barWidth?: number;
  width?: number;
  borderRadius?: number;
  showLabels?: boolean;
  otherSvgProps?: Omit<
    React.SVGProps<SVGSVGElement>,
    keyof MetricLegendThresholdProps
  >;
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

  return (
    <Stack spacing={props.orientation === "horizontal" ? 2 : 3}>
      <Stack spacing={0.5}>
        <Typography variant="labelLarge">{metric.name}</Typography>
        <Typography variant="paragraphSmall">{props.supportingText}</Typography>
      </Stack>
      <LegendThreshold<MetricLevel>
        orientation={props.orientation}
        height={props.height}
        items={items}
        getItemColor={getItemColor}
        getItemLabel={getItemLabel}
        getItemSublabel={getItemSublabel}
        barHeight={props.barHeight}
        barWidth={props.barWidth}
        width={props.width}
        borderRadius={props.borderRadius}
        showLabels={props.showLabels}
        {...props.otherSvgProps}
      />
    </Stack>
  );
};

export default MetricLegendThreshold;
