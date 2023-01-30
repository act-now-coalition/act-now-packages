import React from "react";

import { Stack, Typography } from "@mui/material";

import { Metric } from "../../../metrics";
import { Region } from "../../../regions";
import { useMetricCatalog } from "../MetricCatalogContext";
import { MetricValue } from "../MetricValue";

export interface MetricMapTooltipContentProps {
  /**
   * Metric represented by the content of the tooltip.
   */
  metric: Metric | string;
  /**
   * Region represented by the content of the tooltip.
   */
  region: Region;
}

export const MetricMapTooltipContent = ({
  metric: metricOrId,
  region,
}: MetricMapTooltipContentProps) => {
  const metricCatalog = useMetricCatalog();
  const metric = metricCatalog.getMetric(metricOrId);
  return (
    <Stack spacing={0.5}>
      <Typography variant="labelLarge" color="inherit">
        {region.fullName}
      </Typography>
      <Typography variant="paragraphSmall" color="inherit">
        {metric.extendedName}
      </Typography>
      <MetricValue
        metric={metric}
        region={region}
        color="inherit"
        variant="dataEmphasizedSmall"
      />
    </Stack>
  );
};
