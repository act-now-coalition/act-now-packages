import React from "react";

import { Stack, useMediaQuery, useTheme } from "@mui/material";

import { Metric } from "@actnowcoalition/metrics";
import { Region } from "@actnowcoalition/regions";

import { useMetricCatalog } from "../MetricCatalogContext";
import { MetricOverview } from "../MetricOverview";

export interface MetricOverviewsBlockProps {
  /**
   * Region represented by the metric overviews.
   */
  region: Region;
  /**
   * Metrics to display overviews for.
   */
  metrics: Array<Metric | string>;
  /**
   * Charts to render for each metric. Charts will not be rendered on small screens.
   */
  metricCharts?: { [metricId: string]: React.ReactNode };
}

export const MetricOverviewsBlock = ({
  region,
  metrics,
  metricCharts,
}: MetricOverviewsBlockProps) => {
  const metricCatalog = useMetricCatalog();
  const resolvedMetrics = metrics.map((metric) =>
    metricCatalog.getMetric(metric)
  );
  const theme = useTheme();
  const isSmallBreakpoint = useMediaQuery(
    `(max-width: ${theme.breakpoints.values.sm}px)`
  );
  return (
    <Stack direction={isSmallBreakpoint ? "column" : "row"} spacing={5}>
      {resolvedMetrics.map((metric) => (
        <MetricOverview
          region={region}
          metric={metric}
          key={metric.id}
          orientation={isSmallBreakpoint ? "horizontal" : "vertical"}
          metricChart={metricCharts?.[metric.id]}
        />
      ))}
    </Stack>
  );
};
