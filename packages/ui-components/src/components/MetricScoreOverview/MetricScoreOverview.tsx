import React from "react";
import { Container, StyledInfoIcon } from "./MetricScoreOverview.style";
import { Region } from "@actnowcoalition/regions";
import { Metric } from "@actnowcoalition/metrics";
import { useMetricCatalog } from "../MetricCatalogContext";
import { MetricLegendThreshold } from "../MetricLegendThreshold";
import { MetricValue } from "../MetricValue";
import { Stack, Typography } from "@mui/material";
import { InfoTooltip } from "../InfoTooltip";

export interface MetricScoreOverviewProps {
  /** Region for which we want to show the metric overview */
  region: Region;
  /** Metric for which we want to show the metric overview */
  metric: Metric | string;
  /** Optional supporting text for the metric */
  supportingText?: string;
  /** Optional text to fill tooltip. If undefined, info tooltip is not rendered. */
  tooltipText?: string;
}

export const MetricScoreOverview: React.FC<MetricScoreOverviewProps> = ({
  region,
  metric,
  supportingText,
  tooltipText,
}) => {
  const metricCatalog = useMetricCatalog();
  metric = metricCatalog.getMetric(metric);

  const metricLegendThreshold = (
    <MetricLegendThreshold
      orientation="vertical"
      metric={metric}
      showLabels={false}
      includeOverview={false}
      height={72}
      borderRadius={8}
      barWidth={12}
    />
  );
  const metricValue = <MetricValue region={region} metric={metric} />;

  // Using color for 'contrast' text color style.
  const tooltipTypography = (
    <Typography variant="paragraphSmall" color="#F6F6F6">
      {tooltipText}
    </Typography>
  );
  const infoIcon = (
    <InfoTooltip title={tooltipTypography}>
      <StyledInfoIcon />
    </InfoTooltip>
  );

  return (
    <Container>
      <Stack direction={"column"} spacing={2}>
        <Stack direction={"row"} spacing={1} alignItems={"center"}>
          {metricLegendThreshold}
          <Stack direction={"column"} spacing={1}>
            <Typography variant="paragraphSmall">
              {metric.name}
              {tooltipText && infoIcon}
            </Typography>
            {metricValue}
          </Stack>
        </Stack>
        {supportingText && (
          <Typography variant="paragraphLarge">{supportingText}</Typography>
        )}
      </Stack>
    </Container>
  );
};
