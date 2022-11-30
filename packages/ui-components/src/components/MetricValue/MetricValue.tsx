import React from "react";

import { Stack, StackProps, Typography, TypographyProps } from "@mui/material";

import { Metric } from "@actnowcoalition/metrics";
import { Region } from "@actnowcoalition/regions";

import { useData } from "../../common/hooks";
import { useMetricCatalog } from "../MetricCatalogContext";
import { MetricDot } from "../MetricDot";

export interface MetricValueProps extends StackProps {
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
  ...stackProps
}: MetricValueProps) => {
  const metricCatalog = useMetricCatalog();
  const metric = metricCatalog.getMetric(metricOrId);

  const { data, error } = useData(region, metric, /*includeTimeseries=*/ false);

  if (!data || error) {
    return <Typography variant={variant} />;
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center" {...stackProps}>
      <MetricDot region={region} metric={metric} />
      <Typography variant={variant}>
        {metric.formatValue(data.currentValue, "---")}
      </Typography>
    </Stack>
  );
};
