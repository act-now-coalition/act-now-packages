import React from "react";
import { Stack, Typography } from "@mui/material";
import { CommonMetricOverviewProps } from "./interfaces";
import MetricValue from "./MetricValue";
import LabelArrow from "./LabelArrow";

export interface MetricOverviewRegularProps extends CommonMetricOverviewProps {
  size: "regular";
}

const MetricOverviewRegular: React.FC<MetricOverviewRegularProps> = ({
  metric,
}) => (
  <Stack direction="column" spacing={1}>
    <LabelArrow variant="labelLarge">{metric.name}</LabelArrow>
    <ChartPlaceholder />
    <MetricValue variant="dataEmphasizedLarge" metric={metric} />
    <Typography variant="paragraphSmall">Supporting text</Typography>
  </Stack>
);

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
