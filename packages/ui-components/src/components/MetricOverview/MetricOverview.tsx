import { Metric } from "@actnowcoalition/metrics";
import { Region } from "@actnowcoalition/regions";
import { Stack, Typography } from "@mui/material";
import React from "react";

import { LabelIcon } from "../LabelIcon";
import { useMetricCatalog } from "../MetricCatalogContext";
import { MetricValue } from "../MetricValue";

export interface MetricOverviewProps {
  /** Region for which we want to show the metric overview */
  region: Region;
  /** Metric for which we want to show the metric overview */
  metric: Metric | string;
  /** Optional metricChart. It only renders if orientation="vertical" */
  metricChart?: React.ReactNode;
  /**
   * Orientation of the component. The metricChart only renders if
   * orientation="vertical"
   */
  orientation?: "horizontal" | "vertical";
}

export const MetricOverview = ({
  region,
  metric: metricOrId,
  metricChart,
  orientation = "vertical",
}: MetricOverviewProps) => {
  const metricCatalog = useMetricCatalog();
  const metric = metricCatalog.getMetric(metricOrId);

  if (orientation === "vertical") {
    return (
      <Stack direction="column" spacing={1}>
        <LabelIcon>{metric.name}</LabelIcon>
        {metricChart}
        <MetricValue region={region} metric={metric} />
        <Typography variant="paragraphSmall">{metric.extendedName}</Typography>
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
      <Typography variant="paragraphSmall">{metric.extendedName}</Typography>
    </Stack>
  );
};
