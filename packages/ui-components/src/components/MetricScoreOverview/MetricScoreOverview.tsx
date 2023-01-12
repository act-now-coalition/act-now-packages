import React from "react";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { IconButton, Stack, Typography } from "@mui/material";

import { Metric } from "@actnowcoalition/metrics";
import { Region } from "@actnowcoalition/regions";

import { InfoTooltip } from "../InfoTooltip";
import { useMetricCatalog } from "../MetricCatalogContext";
import { MetricLegendThreshold } from "../MetricLegendThreshold";
import { MetricValue } from "../MetricValue";

export interface MetricScoreOverviewProps {
  /**
   * Region represented by the MetricScoreOverview.
   */
  region: Region;
  /**
   * Metric represented by the MetricScoreOverview.
   */
  metric: Metric | string;
  /**
   * Content to render in the overview's tooltip.
   * If undefined, a tooltip does not render.
   */
  tooltipTitle?: React.ReactNode;
}

export const MetricScoreOverview = ({
  region,
  metric,
  tooltipTitle,
}: MetricScoreOverviewProps) => {
  const metricCatalog = useMetricCatalog();
  const resolvedMetric = metricCatalog.getMetric(metric);

  return (
    <Stack direction="row" spacing={2} alignItems="center" width="fit-content">
      <MetricLegendThreshold
        orientation="vertical"
        metric={resolvedMetric}
        showLabels={false}
        showOverview={false}
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
