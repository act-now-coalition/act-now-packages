import React from "react";
import { Stack, Typography, Tooltip, TooltipProps } from "@mui/material";
import { Metric, TimeseriesPoint } from "@actnowcoalition/metrics";
import { Region } from "@actnowcoalition/regions";
import { formatDateTime, DateFormat } from "@actnowcoalition/time-utils";

export interface MetricTooltipProps extends MetricTooltipContentProps {
  /** Children is the component that, when hovered, should open the tooltip */
  children: React.ReactNode;
}

export const MetricTooltip = ({
  metric,
  region,
  point,
  ...tooltipProps
}: MetricTooltipProps & Omit<TooltipProps, "title">) => (
  <Tooltip
    arrow
    placement="top"
    disableInteractive
    title={
      <MetricTooltipContent metric={metric} region={region} point={point} />
    }
    {...tooltipProps}
  />
);

export interface MetricTooltipContentProps {
  /** Metric to use to render the tooltip */
  metric: Metric;
  /** Region to use to render the tooltip */
  region: Region;
  /**
   * Point with the date and value to show in the tooltip. The date and
   * value of the point usually correspond to the point being hovered
   * by the user. See `ChartOverlayX`, for example.
   */
  point: TimeseriesPoint<number>;
}

export const MetricTooltipContent = ({
  metric,
  region,
  point,
}: MetricTooltipContentProps) => {
  return (
    <Stack spacing={0.5}>
      <Typography variant="overline" color="inherit">
        {formatDateTime(point.date, DateFormat.MMMM_D_YYYY)}
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
