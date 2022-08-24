import React from "react";
import { Stack, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const MetricOverviewRegular: React.FC = () => {
  return (
    <Stack direction="column" spacing={1}>
      <Stack direction="row" alignItems="center">
        <Typography variant="labelLarge">Metric name</Typography>
        <ArrowForwardIcon fontSize="small"></ArrowForwardIcon>
      </Stack>
      <div
        style={{ backgroundColor: "#5F6C7233", borderRadius: 4, minHeight: 72 }}
      />
      <Typography variant="dataEmphasizedLarge">123.45</Typography>
      <Typography variant="paragraphSmall">Supporting text</Typography>
    </Stack>
  );
};

export default MetricOverviewRegular;
