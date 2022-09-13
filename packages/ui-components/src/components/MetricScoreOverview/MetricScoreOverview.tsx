import React from "react";
import { Region } from "@actnowcoalition/regions";
import { Metric } from "@actnowcoalition/metrics";
import { useMetricCatalog } from "../MetricCatalogContext";
import { MetricLegendThreshold } from "../MetricLegendThreshold";
import { MetricValue } from "../MetricValue";
import { Stack, StackProps, Typography } from "@mui/material";
import { InfoTooltip } from "../InfoTooltip";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export interface MetricScoreOverviewProps extends StackProps {
  /** Region for which we want to show the metric overview */
  region: Region;
  /** Metric for which we want to show the metric overview */
  metric: Metric | string;
  /** Optional text to fill tooltip. If undefined, info tooltip is not rendered. */
  tooltipTitle?: string;
}

export const MetricScoreOverview: React.FC<MetricScoreOverviewProps> = ({
  region,
  metric,
  tooltipTitle,
  ...otherStackProps
}) => {
  const metricCatalog = useMetricCatalog();
  const resolvedMetric = metricCatalog.getMetric(metric);

  const metricLegendThreshold = (
    <MetricLegendThreshold
      orientation="vertical"
      metric={resolvedMetric}
      showLabels={false}
      includeOverview={false}
      height={72}
      borderRadius={6}
      barWidth={12}
    />
  );
  const metricValue = <MetricValue region={region} metric={resolvedMetric} />;

  return (
    <Stack direction={"column"} spacing={2}>
      <Stack
        direction={"row"}
        spacing={1}
        alignItems={"center"}
        {...otherStackProps}
      >
        {metricLegendThreshold}
        <Stack direction={"column"} spacing={1}>
          <Typography variant="paragraphSmall" color="secondary.light">
            <Stack direction="row" alignItems="center" spacing={1}>
              <span>{resolvedMetric.name}</span>
              {tooltipTitle && (
                <InfoTooltip title={tooltipTitle}>
                  <InfoOutlinedIcon color="inherit" fontSize="small" />
                </InfoTooltip>
              )}
            </Stack>
          </Typography>
          {metricValue}
        </Stack>
      </Stack>
    </Stack>
  );
};
