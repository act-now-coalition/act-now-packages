import React from "react";

import { Stack } from "@mui/material";

import { Metric } from "@actnowcoalition/metrics";
import { Region } from "@actnowcoalition/regions";

import { useMetricCatalog } from "../MetricCatalogContext";
import { MetricOverview } from "../MetricOverview";

export interface MetricOverviewsBlockProps {
  region: Region;
  metrics: Array<Metric | string>;
}

export const MetricOverviewsBlock = ({
  region,
  metrics,
}: MetricOverviewsBlockProps) => {
  const metricCatalog = useMetricCatalog();
  const resolvedMetrics = metrics.map((metric) =>
    metricCatalog.getMetric(metric)
  );
  return (
    <Stack direction={"row"} spacing={5}>
      {resolvedMetrics.map((metric) => (
        <MetricOverview region={region} metric={metric} key={metric.id} />
      ))}
    </Stack>
  );
};
