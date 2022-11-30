import { Stack, Typography } from "@mui/material";
import React from "react";

import { assert } from "@actnowcoalition/assert";
import { Category, Metric } from "@actnowcoalition/metrics";

import { LegendCategorical } from "../LegendCategorical";
import { useMetricCatalog } from "../MetricCatalogContext";

export interface MetricLegendCategoricalProps {
  /** Metric which we want to display categories for. */
  metric: Metric | string;
  /**
   * Whether the legend items are oriented horizontally (in a row)
   * or vertically (in a column) on desktop screens ('md' and wider).
   */
  orientation?: "horizontal" | "vertical";
}

const getItemColor = (item: Category) => item.color;
const getItemLabel = (item: Category) => item.name ?? item.id;

export const MetricLegendCategorical = ({
  metric,
  orientation,
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
