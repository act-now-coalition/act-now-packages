import React from "react";
import { Stack, Typography, Tooltip, TooltipProps } from "@mui/material";
import { Metric } from "@actnowcoalition/metrics";
import { Region } from "@actnowcoalition/regions";
import { formatDateTime, DateFormat } from "@actnowcoalition/time-utils";

export interface MetricTooltipProps extends MetricTooltipContentProps {
  children: React.ReactNode;
}

export const MetricTooltip = ({
  metric,
  region,
  date,
  value,
  ...tooltipProps
}: MetricTooltipProps & Omit<TooltipProps, "title">) => {
  return (
    <Tooltip
      arrow
      title={
        <MetricTooltipContent
          metric={metric}
          region={region}
          date={date}
          value={value}
        />
      }
      {...tooltipProps}
    />
  );
};

export interface MetricTooltipContentProps {
  metric: Metric;
  region: Region;
  date: Date;
  value: number;
}

export const MetricTooltipContent = ({
  metric,
  region,
  date,
  value,
}: MetricTooltipContentProps) => {
  return (
    <Stack spacing={0.5}>
      <Typography variant="overline" color="inherit">
        {formatDateTime(date, DateFormat.MMMM_D_YYYY)}
      </Typography>
      <Typography variant="overline" color="inherit">
        {metric.name}
      </Typography>
      <Typography variant="dataEmphasizedSmall" color="inherit">
        {metric.formatValue(value, "---")}
      </Typography>
      <Typography
        variant="paragraphSmall"
        color="inherit"
      >{`in ${region.fullName}`}</Typography>
    </Stack>
  );
};
