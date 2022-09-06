import React from "react";
import { LegendThreshold } from "../LegendThreshold";
import { Metric, MetricLevel } from "@actnowcoalition/metrics";
import { useMetricCatalog } from "../MetricCatalogContext";
import { LegendThresholdHorizontalProps } from "../LegendThreshold/LegendThresholdHorizontal";
import { LegendThresholdVerticalProps } from "../LegendThreshold/LegendThresholdVertical";
import { assert } from "@actnowcoalition/assert";
import { Stack, Typography } from "@mui/material";

const getItemColor = (item: MetricLevel) => item.color;
const getItemLabel = (item: MetricLevel) => item.name ?? item.id;
const getItemSublabel = (item: MetricLevel) => item.description ?? "";

interface CommonMetricLegendThresholdProps {
  metric: Metric | string;
  startLabel?: string;
  endLabel?: string;
  supportingText?: string;
  otherSvgProps?: Omit<
    React.SVGProps<SVGSVGElement>,
    keyof MetricLegendThresholdVerticalProps
  >;
}

interface MetricLegendThresholdHorizontalProps
  extends Omit<
      LegendThresholdHorizontalProps<MetricLevel>,
      "getItemColor" | "getItemLabel" | "items"
    >,
    CommonMetricLegendThresholdProps {}

interface MetricLegendThresholdVerticalProps
  extends Omit<
      LegendThresholdVerticalProps<MetricLevel>,
      "getItemColor" | "getItemLabel" | "getItemSublabel" | "items"
    >,
    CommonMetricLegendThresholdProps {}

export type MetricLegendThresholdProps =
  | MetricLegendThresholdHorizontalProps
  | MetricLegendThresholdVerticalProps;

const MetricLegendThreshold = (props: MetricLegendThresholdProps) => {
  const metricCatalog = useMetricCatalog();
  const metric = metricCatalog.getMetric(props.metric);
  const items = metric.levelSet?.levels;
  assert(
    items,
    "Metric must have thresholds to use MetricLegendThreshold." +
      `No thresholds found for metric ${metric.id}.`
  );

  const derivedProps =
    props.orientation === "horizontal"
      ? { items, getItemColor, getItemLabel }
      : { items, getItemColor, getItemLabel, getItemSublabel };

  return (
    <Stack spacing={props.orientation === "horizontal" ? 2 : 3}>
      <Stack spacing={0.5}>
        <Typography variant="labelLarge">{metric.name}</Typography>
        <Typography variant="paragraphSmall">{props.supportingText}</Typography>
      </Stack>
      <Stack direction="row" spacing={1}>
        <Typography variant="paragraphSmall">{props.startLabel}</Typography>
        <LegendThreshold<MetricLevel> {...props} {...derivedProps} />
        <Typography variant="paragraphSmall">{props.endLabel}</Typography>
      </Stack>
    </Stack>
  );
};

export default MetricLegendThreshold;
