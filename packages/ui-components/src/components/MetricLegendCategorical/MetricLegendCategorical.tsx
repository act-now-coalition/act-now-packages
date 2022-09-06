import React from "react";
import { Stack, Typography } from "@mui/material";
import { Metric, MetricCategory } from "@actnowcoalition/metrics";
import { assert } from "@actnowcoalition/assert";
import { useMetricCatalog } from "../MetricCatalogContext";
import { LegendCategorical } from "../LegendCategorical";

export interface MetricLegendCategoricalProps {
  /** Metric which we want to display categories for. */
  metric: Metric | string;
  /** Supporting text to give context to categories. */
  supportingText: string;
  /**
   * Whether the legend items are oriented horizontally (in a row)
   * or vertically (in a column) on desktop screens ('md' and wider).
   */
  orientation?: "horizontal" | "vertical";
}

const getItemColor = (item: MetricCategory) => item.color;
const getItemLabel = (item: MetricCategory) => item.label;

const MetricLegendCategorical = ({
  metric,
  supportingText,
  orientation,
}: MetricLegendCategoricalProps) => {
  const metricCatalog = useMetricCatalog();
  metric = metricCatalog.getMetric(metric);
  const items = metric.categories;
  assert(
    items,
    "Metric must define categories in order to use MetricLegendCategorical " +
      `No categories found for metric: ${metric}`
  );

  return (
    <Stack spacing={2}>
      <Stack spacing={0.5}>
        <Typography variant="labelLarge">{metric.name}</Typography>
        <Typography variant="paragraphSmall">{supportingText}</Typography>
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

export default MetricLegendCategorical;
