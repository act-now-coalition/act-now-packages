import React from "react";
import { Stack, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const MetricOverviewCompact: React.FC = () => {
  return (
    <Stack direction="column" spacing={0.5}>
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" alignItems="center">
          <Typography variant="labelLarge">Metric name</Typography>
          <ArrowForwardIcon fontSize="small"></ArrowForwardIcon>
        </Stack>
        <Typography variant="dataEmphasizedSmall">123.45</Typography>
      </Stack>
      <Typography variant="paragraphSmall">Supporting text</Typography>
    </Stack>
  );
};

export default MetricOverviewCompact;
