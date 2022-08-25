import React from "react";
import { Stack, Typography, TypographyProps } from "@mui/material";
import { MetricData } from "@actnowcoalition/metrics";

export interface MetricValueProps<T> {
  metricData: MetricData<T>;
  variant?: TypographyProps["variant"];
}

const MetricValue = <T,>({
  variant = "dataEmphasizedLarge",
  metricData,
}: MetricValueProps<T>) => {
  const { metric, currentValue } = metricData;
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <PlaceholderDot />
      <Typography variant={variant}>
        {metric.formatValue(currentValue)}
      </Typography>
    </Stack>
  );
};

const PlaceholderDot: React.FC = () => {
  return (
    <div
      style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "#eee" }}
    />
  );
};

export default MetricValue;
