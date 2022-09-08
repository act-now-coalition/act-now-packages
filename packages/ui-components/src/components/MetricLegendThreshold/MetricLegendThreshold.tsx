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
  startLabel?: React.ReactNode;
  /** Optional label for the right or bottom side of the thermometer. */
  endLabel?: React.ReactNode;
  /** Whether or not to display metric name and info. If false, only thermometer is displayed. */
  includeOverview?: boolean;
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
   * Height of the bars. When not adding the labels, make sure that
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

export const MetricLegendThreshold: React.FC<MetricLegendThresholdProps> = ({
  metric,
  supportingText,
  startLabel,
  endLabel,
  includeOverview = true,
  ...legendThresholdProps
}) => {
  const metricCatalog = useMetricCatalog();
  metric = metricCatalog.getMetric(metric);
  const items = metric.levelSet?.levels;
  assert(
    items,
    "Metric must have thresholds to use MetricLegendThreshold." +
      `No thresholds found for metric ${metric}.`
  );
  const isHorizontal = legendThresholdProps.orientation === "horizontal";
  const derivedProps = isHorizontal
    ? { items, getItemColor, getItemLabel }
    : { items, getItemColor, getItemLabel, getItemSublabel };

  if (!includeOverview) {
    return <LegendThreshold {...derivedProps} {...legendThresholdProps} />;
  } else if (isHorizontal) {
    return (
      <Stack spacing={2} alignItems="center">
        <Stack spacing={0.5}>
          <Typography variant="labelLarge">{metric.name}</Typography>
          <Typography variant="paragraphSmall">{supportingText}</Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          {startLabel && startLabel}
          <LegendThreshold<MetricLevel>
            {...derivedProps}
            {...legendThresholdProps}
          />
          {endLabel && endLabel}
        </Stack>
      </Stack>
    );
  } else {
    return (
      <Stack spacing={3}>
        <Stack spacing={0.5}>
          <Typography variant="labelLarge">{metric.name}</Typography>
          <Typography variant="paragraphSmall">{supportingText}</Typography>
        </Stack>
        <Stack direction="column" spacing={1}>
          {startLabel && startLabel}
          <LegendThreshold<MetricLevel>
            {...derivedProps}
            {...legendThresholdProps}
          />
          {endLabel && endLabel}
        </Stack>
      </Stack>
    );
  }
};
