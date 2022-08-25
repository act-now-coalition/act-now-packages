import React from "react";
import { Stack, Typography } from "@mui/material";
import { CommonMetricOverviewProps } from "./interfaces";
import MetricValue from "./MetricValue";
import LabelArrow from "./LabelArrow";

export interface MetricOverviewRegularProps<T>
  extends CommonMetricOverviewProps<T> {
  size: "regular";
}

const MetricOverviewRegular = <T,>({
  dataOrError,
}: MetricOverviewRegularProps<T>) => {
  const { error, data } = dataOrError;
  if (error || !data) {
    return null;
  }
  return (
    <Stack direction="column" spacing={1}>
      <LabelArrow variant="labelLarge">{data.metric.name}</LabelArrow>
      <ChartPlaceholder />
      <MetricValue variant="dataEmphasizedLarge" metricData={data} />
      <Typography variant="paragraphSmall">Supporting text</Typography>
    </Stack>
  );
};

const ChartPlaceholder: React.FC = () => {
  return (
    <div
      style={{
        borderRadius: 4,
        backgroundColor: "#eee",
        display: "grid",
        placeItems: "center",
        height: 72,
      }}
    >
      <Typography variant="overline" component="div" color="#777">
        placeholder
      </Typography>
    </div>
  );
};

export default MetricOverviewRegular;
