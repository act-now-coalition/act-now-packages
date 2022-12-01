import React from "react";

import { Stack, Typography, TypographyProps } from "@mui/material";

import { Metric } from "@actnowcoalition/metrics";
import { Region } from "@actnowcoalition/regions";

import { useData } from "../../common/hooks";
import { useMetricCatalog } from "../MetricCatalogContext";
import { MetricDot } from "../MetricDot";

export interface MetricValueProps {
  /** Region for which we want to show the metric value */
  region: Region;
  /** Metric for which we want to show the metric value  */
  metric: Metric | string;
  /**
   * Typography variant used to render the metric value. We use
   * dataEmphasizedLarge by default.
   * */
  variant?: TypographyProps["variant"];
}

export const MetricValue = ({
  region,
  metric: metricOrId,
  variant = "dataEmphasizedLarge",
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

  const showMetricDot = data && data.currentValue !== null;

  return (
    <Stack direction="row" spacing={1} alignItems="center" width="fit-content">
      {showMetricDot && <MetricDot region={region} metric={metric} />}
      <Typography variant={variant}>{formattedValue}</Typography>
    </Stack>
  );
};
