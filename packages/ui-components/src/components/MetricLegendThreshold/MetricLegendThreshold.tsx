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
  /** Metric to display thresholds for. */
  metric: Metric | string;
  /** Optional label for the left side of the thermometer. */
  startLabel?: string;
  /** Optional label for the right side of the thermometer. */
  endLabel?: string;
  /** Optional supporting text to give context for the thresholds. */
  supportingText?: string;
  /** Optional other props. */
  otherSvgProps?: Omit<
    React.SVGProps<SVGSVGElement>,
    keyof MetricLegendThresholdVerticalProps
  >;
}

export interface MetricLegendThresholdHorizontalProps
  extends CommonMetricLegendThresholdProps,
    Omit<
      LegendThresholdHorizontalProps<MetricLevel>,
      "getItemColor" | "getItemLabel" | "items"
    > {}

export interface MetricLegendThresholdVerticalProps
  extends CommonMetricLegendThresholdProps,
    Omit<
      LegendThresholdVerticalProps<MetricLevel>,
      "getItemColor" | "getItemLabel" | "getItemSublabel" | "items"
    > {}

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
    <Stack spacing={isHorizontal ? 2 : 3}>
      <Stack spacing={0.5}>
        <Typography variant="labelLarge">{metric.name}</Typography>
        <Typography variant="paragraphSmall">{props.supportingText}</Typography>
      </Stack>
      <Stack direction={isHorizontal ? "row" : "column"} spacing={1}>
        <Typography variant="paragraphSmall">{props.startLabel}</Typography>
        <LegendThreshold<MetricLevel> {...props} {...derivedProps} />
        <Typography variant="paragraphSmall">{props.endLabel}</Typography>
      </Stack>
    </Stack>
  );
};
