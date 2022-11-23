import { Metric } from "@actnowcoalition/metrics";
import { Region } from "@actnowcoalition/regions";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Stack, StackProps, Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import React from "react";

import { InfoTooltip } from "../InfoTooltip";
import { useMetricCatalog } from "../MetricCatalogContext";
import { MetricLegendThreshold } from "../MetricLegendThreshold";
import { MetricValue } from "../MetricValue";

export interface MetricScoreOverviewProps extends StackProps {
  /** Region for which we want to show the metric overview */
  region: Region;
  /** Metric for which we want to show the metric overview */
  metric: Metric | string;
  /** Optional text to fill tooltip. If undefined, info tooltip is not rendered. */
  tooltipTitle?: React.ReactNode;
}

export const MetricScoreOverview = ({
  region,
  metric,
  tooltipTitle,
  ...otherStackProps
}: MetricScoreOverviewProps) => {
  const metricCatalog = useMetricCatalog();
  const resolvedMetric = metricCatalog.getMetric(metric);

  return (
    <Stack direction="row" spacing={2} alignItems="center" {...otherStackProps}>
      <MetricLegendThreshold
        orientation="vertical"
        metric={resolvedMetric}
        showLabels={false}
        includeOverview={false}
        height={72}
        borderRadius={6}
        width={12}
      />
      <Stack spacing={1}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="paragraphSmall">
            {resolvedMetric.name}
          </Typography>
          {tooltipTitle && (
            <InfoTooltip title={tooltipTitle}>
              <IconButton color="inherit" disableRipple={true} sx={{ p: 0 }}>
                <InfoOutlinedIcon fontSize="small" />
              </IconButton>
            </InfoTooltip>
          )}
        </Stack>
        <MetricValue region={region} metric={resolvedMetric} />
      </Stack>
    </Stack>
  );
};
