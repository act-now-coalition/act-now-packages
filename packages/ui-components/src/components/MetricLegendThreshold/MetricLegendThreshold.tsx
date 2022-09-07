import React from "react";
import { LegendThreshold } from "../LegendThreshold";
import { Metric, MetricLevel } from "@actnowcoalition/metrics";
import { useMetricCatalog } from "../MetricCatalogContext";
import { assert } from "@actnowcoalition/assert";
import { Stack, Typography } from "@mui/material";

const getItemColor = (item: MetricLevel) => item.color;
const getItemLabel = (item: MetricLevel) => item.name ?? item.id;
const getItemSublabel = (item: MetricLevel) => item.description ?? "";

interface CommonMetricLegendThresholdProps {
  /** Metric to display thresholds for. */
  metric: Metric | string;
  /** Whether to show level labels. Does not affect start/endLabels */
  showLabels?: boolean;
  /** Optional label for the left or top side of the thermometer. */
  startLabel?: string;
  /** Optional label for the right or bottom side of the thermometer. */
  endLabel?: string;
  /** Optional supporting text to give context for the metric. */
  supportingText?: string;
  /** Height of the component, including the colored bars and labels. */
  height?: number;
  /** Border radius of the bars */
  borderRadius?: number;
  /** Optional other props. */
  otherSvgProps?: Omit<
    React.SVGProps<SVGSVGElement>,
    keyof MetricLegendThresholdVerticalProps
  >;
}

export interface MetricLegendThresholdHorizontalProps
  extends CommonMetricLegendThresholdProps {
  /** Orientation of the bars. */
  orientation: "horizontal";
  /** Width of the component. */
  width?: number;
  /**
   * Height of the bars. When not adding the bars, make sure that
   * `barHeight` is set to the same value as `height`.
   */
  barHeight?: number;
}

export interface MetricLegendThresholdVerticalProps
  extends CommonMetricLegendThresholdProps {
  /** Orientation of the bars. */
  orientation: "vertical";
  /** Width of the bars. */
  barWidth?: number;
}

export type MetricLegendThresholdProps =
  | MetricLegendThresholdHorizontalProps
  | MetricLegendThresholdVerticalProps;

export const MetricLegendThreshold = (props: MetricLegendThresholdProps) => {
  const metricCatalog = useMetricCatalog();
  const metric = metricCatalog.getMetric(props.metric);
  const items = metric.levelSet?.levels;
  assert(
    items,
    "Metric must have thresholds to use MetricLegendThreshold." +
      `No thresholds found for metric ${metric}.`
  );
  const isHorizontal = props.orientation === "horizontal";
  const derivedProps = isHorizontal
    ? { items, getItemColor, getItemLabel }
    : { items, getItemColor, getItemLabel, getItemSublabel };

  return (
    <Stack
      spacing={isHorizontal ? 2 : 3}
      alignItems={isHorizontal ? "center" : "normal"}
    >
      <Stack spacing={0.5}>
        <Typography variant="labelLarge">{metric.name}</Typography>
        <Typography variant="paragraphSmall">{props.supportingText}</Typography>
      </Stack>
      <Stack direction={isHorizontal ? "row" : "column"} spacing={1}>
        {props.startLabel && (
          <Typography variant="paragraphSmall">{props.startLabel}</Typography>
        )}
        <LegendThreshold<MetricLevel> {...props} {...derivedProps} />
        {props.endLabel && (
          <Typography variant="paragraphSmall">{props.endLabel}</Typography>
        )}
      </Stack>
    </Stack>
  );
};
