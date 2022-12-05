import React from "react";

import { Box, Stack, Typography } from "@mui/material";

import { Metric } from "@actnowcoalition/metrics";

import { LegendThreshold } from "../LegendThreshold";
import { useMetricCatalog } from "../MetricCatalogContext";
import { getMetricCategoryItems } from "./utils";
import { CategoryItem } from "./utils";

export interface MetricLegendThresholdProps {
  /**
   * Orientation of the legend.
   */
  orientation: "horizontal" | "vertical";
  /**
   * Metric represented by the legend.
   */
  metric: Metric | string;
  /**
   * Show the labels of each legend item.
   * This does not affect the start/end labels.
   * @default true
   */
  showLabels?: boolean;
  /**
   * Label rendered at the start of the thermometer.
   * For vertical orientation, this renders above the thermometer.
   * For horizontal orientation, this renders to the left of the thermometer.
   */
  startLabel?: React.ReactNode;
  /**
   * Label rendered at the end of the thermometer.
   * For vertical orientation, this renders below the thermometer.
   * For horizontal orientation, this renders to the right of the thermometer.
   */
  endLabel?: React.ReactNode;
  /**
   * Show the metric name and information.
   * @default true
   */
  showOverview?: boolean;
  /**
   * Border radius of the thermometer.
   */
  borderRadius?: number;
  /**
   * Width of the thermometer.
   */
  width?: number;
  /**
   * Height of the thermometer.
   */
  height?: number;
}

const getItemColor = (item: CategoryItem) => item.color;
const getItemLabelHorizontal = (item: CategoryItem) => item.endThreshold ?? "";
const getItemLabelVertical = (item: CategoryItem) => item.name;
const getItemSublabel = (item: CategoryItem) => item.description ?? "";

export const MetricLegendThreshold = ({
  metric,
  startLabel,
  endLabel,
  showOverview = true,
  showLabels = true,
  ...legendThresholdProps
}: MetricLegendThresholdProps) => {
  const metricCatalog = useMetricCatalog();
  metric = metricCatalog.getMetric(metric);

  const items = getMetricCategoryItems(metric);

  // Common props for both horizontal and vertical orientations
  const commonProps = {
    items,
    getItemColor,
    showLabels,
    ...legendThresholdProps,
  };

  if (!showOverview) {
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
