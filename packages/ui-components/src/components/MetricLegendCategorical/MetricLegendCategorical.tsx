import React from "react";
import LegendCategorical from "../LegendCategorical/LegendCategorical";
import { Metric } from "@actnowcoalition/metrics";
import { assert } from "@actnowcoalition/assert";
import { useMetricCatalog } from "../MetricCatalogContext";
import { MetricCategory } from "@actnowcoalition/metrics";
import { Stack, Typography, TypographyProps } from "@mui/material";

export interface MetricLegendCategoricalProps {
  /** Metric which we want to display the categories for  */
  metric: Metric | string;
  /** Supporting text to give context to categories.*/
  supportingText: string;
  /**
   * Whether the legend items are oriented horizontally (in a row)
   * or vertically (in a column) on desktop screens ('md' and wider).
   */
  orientation?: "horizontal" | "vertical";
  /**
   * Typography variant used to render the metric name. We use
   * dataEmphasizedSmall by default.
   * */
  titleVariant?: TypographyProps["variant"];
}

const getItemColor = (item: MetricCategory) => item.color;
const getItemLabel = (item: MetricCategory) => item.label;

const MetricLegendCategorical = ({
  metric,
  supportingText,
  orientation,
  titleVariant = "dataEmphasizedSmall",
}: MetricLegendCategoricalProps) => {
  const metricCatalog = useMetricCatalog();
  const resolvedMetric =
    typeof metric === "string" ? metricCatalog.getMetric(metric) : metric;
  const items = resolvedMetric.categories;
  assert(
    items,
    "Metric must define categories in order to use MetricLegendCategorical" +
      `No categories found for metric ${metric.toString()}`
  );

  return (
    <Stack spacing={1}>
      <Typography variant={titleVariant}>{resolvedMetric.name}</Typography>
      <Typography>{supportingText}</Typography>
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
