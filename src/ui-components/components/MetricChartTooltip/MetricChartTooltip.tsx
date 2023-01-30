import React from "react";

import { Stack, Tooltip, TooltipProps, Typography } from "@mui/material";

import { Metric, TimeseriesPoint } from "../../../metrics";
import { Region } from "../../../regions";
import { DateFormat, formatUTCDateTime } from "../../../time-utils";
import { useMetricCatalog } from "../MetricCatalogContext";

export interface MetricChartTooltipWithChildren
  extends MetricChartTooltipContentProps {
  /**
   * ReactNode that, when hovered, triggers the tooltip to open.
   */
  children: React.ReactNode;
}

export type MetricChartTooltipProps = MetricChartTooltipWithChildren &
  Omit<TooltipProps, "title">;

export const MetricChartTooltip = ({
  metric,
  region,
  point,
  ...tooltipProps
}: MetricChartTooltipProps) => {
  return (
    <Tooltip
      arrow
      placement="top"
      disableInteractive
      title={
        <MetricChartTooltipContent
          metric={metric}
          region={region}
          point={point}
        />
      }
      {...tooltipProps}
    />
  );
};

export interface MetricChartTooltipContentProps {
  /**
   * Metric represented by the content of the tooltip.
   */
  metric: Metric | string;
  /**
   * Region represented by the content of the tooltip.
   */
  region: Region;
  /**
   * Point with the date and value to render in the tooltip.
   * The date and value of the point usually correspond to the point being hovered.
   */
  point: TimeseriesPoint<number>;
}

export const MetricChartTooltipContent = ({
  metric: metricOrId,
  region,
  point,
}: MetricChartTooltipContentProps) => {
  const metricCatalog = useMetricCatalog();
  const metric = metricCatalog.getMetric(metricOrId);
  return (
    <Stack spacing={0.5}>
      <Typography variant="overline" color="inherit">
        {formatUTCDateTime(point.date, DateFormat.MMMM_D_YYYY)}
      </Typography>
      <Typography variant="overline" color="inherit">
        {metric.name}
      </Typography>
      <Typography variant="dataEmphasizedSmall" color="inherit">
        {metric.formatValue(point.value, "---")}
      </Typography>
      <Typography
        variant="paragraphSmall"
        color="inherit"
      >{`in ${region.fullName}`}</Typography>
    </Stack>
  );
};
