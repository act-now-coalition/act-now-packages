import React from "react";
import { Stack, Typography } from "@mui/material";
import { CommonMetricOverviewProps } from "./interfaces";
import MetricValue from "./MetricValue";
import LabelArrow from "./LabelArrow";

export interface MetricOverviewCompactProps extends CommonMetricOverviewProps {
  size: "compact";
}

const MetricOverviewCompact: React.FC<MetricOverviewCompactProps> = ({
  metric,
}) => {
  return (
    <Stack direction="column" spacing={0.5}>
      <Stack direction="row" justifyContent="space-between">
        <LabelArrow variant="labelLarge">{metric.name}</LabelArrow>
        <MetricValue variant="dataEmphasizedSmall" metric={metric} />
      </Stack>
      <Typography variant="paragraphSmall">Supporting text</Typography>
    </Stack>
  );
};

export default MetricOverviewCompact;
