import React from "react";
import { Stack, Typography, TypographyProps } from "@mui/material";
import { Metric } from "@actnowcoalition/metrics";

export interface MetricValueProps {
  metric: Metric;
  variant?: TypographyProps["variant"];
}

const MetricValue: React.FC<MetricValueProps> = ({
  variant = "dataEmphasizedLarge",
  metric,
}) => {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <div
        style={{
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: "#ddd",
        }}
      />
      <Typography variant={variant}>{metric.formatValue(123.4555)}</Typography>
    </Stack>
  );
};

export default MetricValue;
