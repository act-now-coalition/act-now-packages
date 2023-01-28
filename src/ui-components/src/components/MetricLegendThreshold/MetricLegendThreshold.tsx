import React from "react";

import { Box, Stack, Typography } from "@mui/material";

import { Category, Metric } from "@actnowcoalition/metrics";

import { BaseLegendThresholdProps, LegendThreshold } from "../LegendThreshold";
import { useMetricCatalog } from "../MetricCatalogContext";
import { CategoryItem, getMetricCategoryItems } from "./utils";

export interface MetricLegendThresholdProps extends BaseLegendThresholdProps {
  /**
   * Metric represented by the legend.
   */
  metric: Metric | string;
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
   * Category of the metric's current value.
   */
  currentCategory?: Category;
}

const getItemColor = (item: CategoryItem) => item.color;
const getItemLabelHorizontal = (item: CategoryItem) => item.endThreshold ?? "";
const getItemLabelVertical = (item: CategoryItem) => item.name;
const getItemSublabel = (item: CategoryItem) => item.description ?? "";
const getItemShowIndicator = (item: CategoryItem) => item.showIndicator;

export const MetricLegendThreshold = ({
  metric,
  startLabel,
  endLabel,
  showOverview = true,
  showLabels = true,
  currentCategory,
  ...legendThresholdProps
}: MetricLegendThresholdProps) => {
  const metricCatalog = useMetricCatalog();
  metric = metricCatalog.getMetric(metric);

  const items = getMetricCategoryItems(metric, currentCategory);

  // Common props for both horizontal and vertical orientations
  const commonProps = {
    items,
    getItemColor,
    showLabels,
    getItemShowIndicator,
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
        <Stack direction="row" spacing={1} justifyContent="center">
          <Box textAlign="end">{startLabel}</Box>
          <LegendThreshold<CategoryItem>
            {...commonProps}
            getItemLabel={getItemLabelHorizontal}
          />
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
