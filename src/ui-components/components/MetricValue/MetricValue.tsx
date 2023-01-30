import React from "react";

import { Stack, Typography, TypographyProps } from "@mui/material";

import { Metric } from "../../../metrics";
import { Region } from "../../../regions";
import { useData } from "../../common/hooks";
import { ComponentLoaded } from "../ComponentLoaded";
import { useMetricCatalog } from "../MetricCatalogContext";
import { MetricDot } from "../MetricDot";

export interface MetricValueProps {
  /**
   * Region represented by the metric value.
   */
  region: Region;
  /**
   * Metric represented by the metric value.
   */
  metric: Metric | string;
  /**
   * MUI Typography variant applied to the metric value text.
   * @default "dataEmphasizedLarge"
   */
  variant?: TypographyProps["variant"];
  /**
   * MUI Typography color applied to the metric value text.
   * @default "inherit"
   */
  color?: TypographyProps["color"];
}

export const MetricValue = ({
  region,
  metric: metricOrId,
  variant = "dataEmphasizedLarge",
  color,
}: MetricValueProps) => {
  const metricCatalog = useMetricCatalog();
  const metric = metricCatalog.getMetric(metricOrId);

  const { data, error } = useData(region, metric, /*includeTimeseries=*/ false);

  // If there's an error we render "---" to match when there's no data.
  // While we are waiting for data to load we render "\u00A0" (a non-breaking
  // space) just so the height renders correctly and we don't get a layout shift
  // when the data is available.
  const formattedValue = error
    ? "---"
    : !data
    ? "\u00A0"
    : metric.formatValue(data.currentValue, "---");

  const showMetricDot =
    metric.hasCategories && data && data.currentValue !== null;

  return (
    <>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        width="fit-content"
      >
        {showMetricDot && <MetricDot region={region} metric={metric} />}
        <Typography variant={variant} color={color}>
          {formattedValue}
        </Typography>
      </Stack>
      {data && <ComponentLoaded />}
    </>
  );
};
