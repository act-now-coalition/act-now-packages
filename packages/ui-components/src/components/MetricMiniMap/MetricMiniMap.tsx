import React, { useState } from "react";
import { RegionDB } from "@actnowcoalition/regions";
import { MetricUSStateMap } from "../Maps";
import { Box, Typography, Paper, TextField, MenuItem } from "@mui/material";
import { MetricLegendThreshold } from "../MetricLegendThreshold";
import { useMetricCatalog } from "../MetricCatalogContext";
import { Metric } from "@actnowcoalition/metrics";

export interface MetricMiniMapProps {
  stateRegionId: string;
  metrics: (Metric | string)[];
  regionDB: RegionDB;
  renderTooltip: (regionId: string) => React.ReactElement | string;
}

export const MetricMiniMap: React.FC<MetricMiniMapProps> = ({
  stateRegionId,
  metrics,
  regionDB,
  renderTooltip,
}) => {
  const metricCatalog = useMetricCatalog();
  const [option, setOption] = useState(metrics[1]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOption(event.target.value);
  };
  return (
    <Paper sx={{ width: 328 }}>
      <TextField
        select={true}
        variant="filled"
        fullWidth={true}
        label={<Typography variant="paragraphSmall">Metric</Typography>}
        value={option}
        onChange={handleChange}
        sx={{
          margin: 0,
          "& .MuiFilledInput-root": {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          },
        }}
      >
        {metrics.map((metric) => (
          <MenuItem
            key={metricCatalog.getMetric(metric).id}
            value={metricCatalog.getMetric(metric).id}
          >
            <Typography noWrap>
              {metricCatalog.getMetric(metric).name}
            </Typography>
          </MenuItem>
        ))}
      </TextField>
      <MetricUSStateMap
        stateRegionId={stateRegionId}
        metric={option}
        regionDB={regionDB}
        renderTooltip={renderTooltip}
      />
      <Box padding={3}>
        <MetricLegendThreshold
          orientation="horizontal"
          width={179}
          height={12}
          metric={option}
          showLabels={false}
          startLabel={<Typography variant="paragraphSmall">lower</Typography>}
          endLabel={<Typography variant="paragraphSmall">higher</Typography>}
        />
      </Box>
    </Paper>
  );
};
