import React from "react";
import { Stack, Typography } from "@mui/material";
import { LegendThreshold } from "../LegendThreshold";
import { useMetricCatalog } from "../MetricCatalogContext";
import { LevelItem, MetricLegendThresholdProps } from "./interfaces";
import { getMetricLevelItems } from "./utils";

const getItemColor = (item: LevelItem) => item.color;
const getItemLabelHorizontal = (item: LevelItem) => item.endThreshold ?? "";
const getItemLabelVertical = (item: LevelItem) => item.name;
const getItemSublabel = (item: LevelItem) => item.description ?? "";

export const MetricLegendThreshold: React.FC<MetricLegendThresholdProps> = ({
  metric,
  startLabel,
  endLabel,
  includeOverview = true,
  ...legendThresholdProps
}) => {
  const metricCatalog = useMetricCatalog();
  metric = metricCatalog.getMetric(metric);

  const items = getMetricLevelItems(metric);

  // Common props regardless of horizontal / vertical orientation
  const commonProps = { items, getItemColor, ...legendThresholdProps };

  if (!includeOverview) {
    return <LegendThreshold {...commonProps} />;
  }

  if (legendThresholdProps.orientation === "horizontal") {
    return (
      <Stack spacing={2} alignItems="center">
        <Stack spacing={0.5} alignItems="center">
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
