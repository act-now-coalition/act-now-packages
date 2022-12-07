import React from "react";

import { Box, Stack, Typography } from "@mui/material";

import { Metric } from "@actnowcoalition/metrics";
import { Category } from "@actnowcoalition/metrics";

import { BaseLegendThresholdProps, LegendThreshold } from "../LegendThreshold";
import { useMetricCatalog } from "../MetricCatalogContext";
import { getMetricCategoryItems } from "./utils";
import { CategoryItem } from "./utils";

export interface MetricLegendThresholdProps extends BaseLegendThresholdProps {
  /** Metric to display thresholds for. */
  metric: Metric | string;
  /** Optional label for the left or top side of the thermometer. */
  startLabel?: React.ReactNode;
  /** Optional label for the right or bottom side of the thermometer. */
  endLabel?: React.ReactNode;
  /** Whether or not to display metric name and info. If false, only thermometer is displayed. */
  showOverview?: boolean;
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
  currentCategory,
  ...legendThresholdProps
}: MetricLegendThresholdProps) => {
  const metricCatalog = useMetricCatalog();
  metric = metricCatalog.getMetric(metric);

  const items = getMetricCategoryItems(metric, currentCategory);

  // Props common to both horizontal and vertical orientations
  const commonProps = {
    items,
    getItemColor,
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
