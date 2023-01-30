import React from "react";

import { Stack, Typography } from "@mui/material";

import { Metric } from "../../../metrics";
import { Region } from "../../../regions";
import { LabelIcon } from "../LabelIcon";
import { useMetricCatalog } from "../MetricCatalogContext";
import { MetricValue } from "../MetricValue";

export interface MetricOverviewProps {
  /**
   * Region represented by the metric overview.
   */
  region: Region;
  /**
   * Metric represented by the metric overview.
   */
  metric: Metric | string;
  /**
   * A metric chart to render in the overview.
   * Only renders if orientation="vertical".
   */
  metricChart?: React.ReactNode;
  /**
   * Orientation of the component.
   * @default "vertical"
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
