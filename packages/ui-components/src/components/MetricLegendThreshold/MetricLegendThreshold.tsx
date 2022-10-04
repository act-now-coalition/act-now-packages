import React from "react";
import { Stack, Typography } from "@mui/material";
import { Metric } from "@actnowcoalition/metrics";
import { assert } from "@actnowcoalition/assert";
import { LegendThreshold } from "../LegendThreshold";
import { useMetricCatalog } from "../MetricCatalogContext";

interface LevelItem {
  /** Level name (e.g. "High") */
  name: string;
  /** Level color */
  color: string;
  /** Description of the level */
  description: string | undefined;
  /** Formatted value of the threshold at the end of the current level */
  endThreshold?: string;
}

const getItemColor = (item: LevelItem) => item.color;
const getItemLabelHorizontal = (item: LevelItem) => item.endThreshold ?? "";
const getItemLabelVertical = (item: LevelItem) => item.name;
const getItemSublabel = (item: LevelItem) => item.description ?? "";

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
  startLabel,
  endLabel,
  includeOverview = true,
  ...legendThresholdProps
}) => {
  const metricCatalog = useMetricCatalog();
  metric = metricCatalog.getMetric(metric);

  const items = getLevelItems(metric);

  // Common props regardless of horizontal / vertical orientation
  const commonProps = { items, getItemColor, ...legendThresholdProps };

  if (!includeOverview) {
    return <LegendThreshold {...commonProps} />;
  }

  if (legendThresholdProps.orientation === "horizontal") {
    return (
      <Stack spacing={2} alignItems="center">
        <Stack spacing={0.5}>
          <Typography variant="labelLarge">{metric.name}</Typography>
          <Typography variant="paragraphSmall">
            {metric.extendedName}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          {startLabel}
          <LegendThreshold<LevelItem>
            {...commonProps}
            getItemLabel={getItemLabelHorizontal}
          />
          {endLabel}
        </Stack>
      </Stack>
    );
  } else {
    return (
      <Stack spacing={3}>
        <Stack spacing={0.5}>
          <Typography variant="labelLarge">{metric.name}</Typography>
          <Typography variant="paragraphSmall">
            {metric.extendedName}
          </Typography>
        </Stack>
        <Stack direction="column" spacing={1}>
          {startLabel}
          <LegendThreshold<LevelItem>
            {...commonProps}
            orientation="vertical"
            getItemLabel={getItemLabelVertical}
            getItemSublabel={getItemSublabel}
          />
          {endLabel}
        </Stack>
      </Stack>
    );
  }
};

function getLevelItems(metric: Metric): LevelItem[] {
  const metricLevels = metric.levelSet?.levels;
  const metricThresholds = metric.thresholds;
  assert(
    metricLevels,
    "Metric must have levels and thresholds to use MetricLegendThreshold." +
      `No levels found for metric ${metric}.`
  );
  return metricLevels.map((level, levelIndex) => ({
    name: level.name ?? level.id,
    color: level.color,
    description: level.description,
    endThreshold: metricThresholds
      ? metric.formatValue(metricThresholds[levelIndex])
      : undefined,
  }));
}
