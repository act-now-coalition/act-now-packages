import React from "react";
import { Stack, Typography, Box } from "@mui/material";
import { LegendThreshold } from "../LegendThreshold";
import { useMetricCatalog } from "../MetricCatalogContext";
import { getMetricCategoryItems } from "./utils";
import { Metric } from "@actnowcoalition/metrics";

export interface MetricLegendThresholdProps {
  /** Orientation of the bars. */
  orientation: "horizontal" | "vertical";
  /** Metric to display thresholds for. */
  metric: Metric | string;
  /** Whether to show category labels. Does not affect start/endLabels */
  showLabels?: boolean;
  /** Optional label for the left or top side of the thermometer. */
  startLabel?: React.ReactNode;
  /** Optional label for the right or bottom side of the thermometer. */
  endLabel?: React.ReactNode;
  /** Whether or not to display metric name and info. If false, only thermometer is displayed. */
  includeOverview?: boolean;
  /** Border radius of the bars */
  borderRadius?: number;
  /** Width of the bars */
  width?: number;
  /** Height of the bars */
  height?: number;
  /** Optional other props. */
  otherSvgProps?: Omit<
    React.SVGProps<SVGSVGElement>,
    keyof MetricLegendThresholdProps
  >;
}

export interface CategoryItem {
  /** Category name (e.g. "High") */
  name: string;
  /** Category color */
  color: string;
  /** Description of the category */
  description: string | undefined;
  /** Formatted value of the threshold at the end of the current category */
  endThreshold?: string;
}

const getItemColor = (item: CategoryItem) => item.color;
const getItemLabelHorizontal = (item: CategoryItem) => item.endThreshold ?? "";
const getItemLabelVertical = (item: CategoryItem) => item.name;
const getItemSublabel = (item: CategoryItem) => item.description ?? "";

export const MetricLegendThreshold: React.FC<MetricLegendThresholdProps> = ({
  metric,
  startLabel,
  endLabel,
  includeOverview = true,
  ...legendThresholdProps
}) => {
  const metricCatalog = useMetricCatalog();
  metric = metricCatalog.getMetric(metric);

  const items = getMetricCategoryItems(metric);

  // Common props regardless of horizontal / vertical orientation
  const commonProps = { items, getItemColor, ...legendThresholdProps };

  if (!includeOverview) {
    return <LegendThreshold {...commonProps} />;
  }

  if (legendThresholdProps.orientation === "horizontal") {
    return (
      <Stack spacing={2}>
        <Stack spacing={0.5} alignItems="center">
          <Typography variant="labelLarge">{metric.name}</Typography>
          {metric.extendedName && (
            <Typography variant="paragraphSmall">
              {metric.extendedName}
            </Typography>
          )}
        </Stack>
        <Stack direction="row" spacing={1}>
          <Box>{startLabel}</Box>
          <Box flex={1}>
            <LegendThreshold<CategoryItem>
              {...commonProps}
              getItemLabel={getItemLabelHorizontal}
            />
          </Box>
          <Box>{endLabel}</Box>
        </Stack>
      </Stack>
    );
  } else {
    return (
      <Stack spacing={3}>
        <Stack spacing={0.5}>
          <Typography variant="labelLarge">{metric.name}</Typography>
          {metric.extendedName && (
            <Typography variant="paragraphSmall">
              {metric.extendedName}
            </Typography>
          )}
        </Stack>
        <Stack direction="column" spacing={1}>
          {startLabel}
          <LegendThreshold<CategoryItem>
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
