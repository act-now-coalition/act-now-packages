import React from "react";

import { Stack, Typography } from "@mui/material";

import { assert } from "@actnowcoalition/assert";
import { Category, Metric } from "@actnowcoalition/metrics";

import { LegendCategorical } from "../LegendCategorical";
import { useMetricCatalog } from "../MetricCatalogContext";

export interface MetricLegendCategoricalProps {
  /**
   * Metric represented by the legend.
   */
  metric: Metric | string;
  /**
   * Orientation of the legend for screens sized 'md' and larger.
   * @default "horizontal"
   */
  orientation?: "horizontal" | "vertical";
}

const getItemColor = (item: Category) => item.color;
const getItemLabel = (item: Category) => item.name ?? item.id;

export const MetricLegendCategorical = ({
  metric,
  orientation = "horizontal",
}: MetricLegendCategoricalProps) => {
  const metricCatalog = useMetricCatalog();
  metric = metricCatalog.getMetric(metric);
  const items = metric.categorySet?.categories;
  assert(
    items,
    "Metric must define categories in order to use MetricLegendCategorical. " +
      `No categories found for metric: ${metric}`
  );
  return (
    <Stack spacing={2}>
      <Stack spacing={0.5}>
        <Typography variant="labelLarge">{metric.name}</Typography>
        {metric.extendedName && (
          <Typography variant="paragraphSmall">
            {metric.extendedName}
          </Typography>
        )}
      </Stack>
      <LegendCategorical
        items={items}
        getItemColor={getItemColor}
        getItemLabel={getItemLabel}
        orientation={orientation}
      />
    </Stack>
  );
};
