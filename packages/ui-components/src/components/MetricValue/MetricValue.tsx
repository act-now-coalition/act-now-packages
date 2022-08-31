import React from "react";
import { Stack, Typography, TypographyProps } from "@mui/material";
import { Metric } from "@actnowcoalition/metrics";
import { Region } from "@actnowcoalition/regions";
import { useMetricCatalog } from "../MetricCatalogContext";
import MetricDot from "../MetricDot";

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

const MetricValue: React.FC<MetricValueProps> = ({
  region,
  metric: metricOrId,
  variant = "dataEmphasizedLarge",
}) => {
  const metricCatalog = useMetricCatalog();
  const metric =
    typeof metricOrId === "string"
      ? metricCatalog.getMetric(metricOrId)
      : metricOrId;

  const { data, error } = metricCatalog.useData(region, metric);

  if (!data || error) {
    return <Typography variant={variant} />;
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <MetricDot region={region} metric={metric} />
      <Typography variant={variant}>
        {metric.formatValue(data?.currentValue, "---")}
      </Typography>
    </Stack>
  );
};

export default MetricValue;
