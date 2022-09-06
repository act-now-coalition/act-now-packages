import React from "react";
import { Stack, Typography } from "@mui/material";
import { Region } from "@actnowcoalition/regions";
import { Metric } from "@actnowcoalition/metrics";
import { useMetricCatalog } from "../MetricCatalogContext";
import { LabelIcon } from "../LabelIcon";
import { MetricValue } from "../MetricValue";

export interface MetricOverviewProps {
  /** Region for which we want to show the metric overview */
  region: Region;
  /** Metric for which we want to show the metric overview */
  metric: Metric | string;
  /** Optional supporting text for the metric */
  supportingText?: string;
  /** Optional metricChart. It only renders if orientation="vertical" */
  metricChart?: React.ReactNode;
  /**
   * Orientation of the component. The metricChart only renders if
   * orientation="vertical"
   */
  orientation?: "horizontal" | "vertical";
}

export const MetricOverview: React.FC<MetricOverviewProps> = ({
  region,
  metric: metricOrId,
  metricChart,
  supportingText,
  orientation = "vertical",
}) => {
  const metricCatalog = useMetricCatalog();
  const metric = metricCatalog.getMetric(metricOrId);

  if (orientation === "vertical") {
    return (
      <Stack direction="column" spacing={1}>
        <LabelIcon>{metric.name}</LabelIcon>
        <MetricValue region={region} metric={metric} />
        {metricChart}
        {supportingText && (
          <Typography variant="paragraphSmall">{supportingText}</Typography>
        )}
      </Stack>
    );
  }

  return (
    <Stack direction="column" spacing={0.5}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <LabelIcon>{metric.name}</LabelIcon>
        <MetricValue
          variant="dataEmphasizedSmall"
          region={region}
          metric={metric}
        />
      </Stack>
      {supportingText && (
        <Typography variant="paragraphSmall">{supportingText}</Typography>
      )}
    </Stack>
  );
};
