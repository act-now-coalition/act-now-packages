import React from "react";
import { Stack, Typography } from "@mui/material";
import { CommonMetricOverviewProps } from "./interfaces";
import MetricValue from "./MetricValue";
import LabelArrow from "./LabelArrow";

export interface MetricOverviewCompactProps<T>
  extends CommonMetricOverviewProps<T> {
  size: "compact";
}

const MetricOverviewCompact = <T,>({
  dataOrError,
}: MetricOverviewCompactProps<T>) => {
  const { error, data } = dataOrError;
  if (error || !data) {
    return null;
  }

  return (
    <Stack direction="column" spacing={0.5}>
      <Stack direction="row" justifyContent="space-between">
        <LabelArrow variant="labelLarge">{data.metric.name}</LabelArrow>
        <MetricValue variant="dataEmphasizedSmall" metricData={data} />
      </Stack>
      <Typography variant="paragraphSmall">Supporting text</Typography>
    </Stack>
  );
};

export default MetricOverviewCompact;
