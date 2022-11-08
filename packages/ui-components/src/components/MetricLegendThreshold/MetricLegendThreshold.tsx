import React from "react";
import { Stack, Typography, Box } from "@mui/material";
import { LegendThreshold } from "../LegendThreshold";
import { useMetricCatalog } from "../MetricCatalogContext";
import { CategoryItem, MetricLegendThresholdProps } from "./interfaces";
import { getMetricCategoryItems } from "./utils";

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
