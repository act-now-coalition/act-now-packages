import React, { useState } from "react";
import { RegionDB, Region } from "@actnowcoalition/regions";
import { MetricUSStateMap } from "../MetricUSMaps";
import {
  Box,
  Typography,
  Paper,
  TextField,
  MenuItem,
  useTheme,
} from "@mui/material";
import { MetricLegendThreshold } from "../MetricLegendThreshold";
import { useMetricCatalog } from "../MetricCatalogContext";
import { Metric } from "@actnowcoalition/metrics";
import { getStartLabel, getEndLabel } from "./utils";

export interface MetricMiniMapProps {
  stateRegionId: string;
  currentRegion?: Region;
  metrics: (Metric | string)[];
  regionDB: RegionDB;
  renderTooltip: (regionId: string) => React.ReactElement | string;
}

export const MetricMiniMap: React.FC<MetricMiniMapProps> = ({
  stateRegionId,
  currentRegion,
  metrics,
  regionDB,
  renderTooltip,
}) => {
  const theme = useTheme();
  const metricCatalog = useMetricCatalog();
  const [metric, setMetric] = useState(metrics[0]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMetric(event.target.value);
  };
  return (
    <Paper sx={{ width: theme.spacing(39) }}>
      {metrics.length > 1 && (
        <TextField
          select={true}
          variant="filled"
          fullWidth={true}
          label={<Typography variant="paragraphSmall">Metric</Typography>}
          value={metric}
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
              <Typography>{metricCatalog.getMetric(metric).name}</Typography>
            </MenuItem>
          ))}
        </TextField>
      )}
      <MetricUSStateMap
        stateRegionId={stateRegionId}
        currentRegion={currentRegion}
        metric={metric}
        regionDB={regionDB}
        renderTooltip={renderTooltip}
      />
      <Box padding={3}>
        <MetricLegendThreshold
          orientation="horizontal"
          width={160}
          height={12}
          metric={metric}
          showLabels={false}
          startLabel={
            <Typography variant="paragraphSmall">
              {getStartLabel(metricCatalog.getMetric(metric))}
            </Typography>
          }
          endLabel={
            <Typography variant="paragraphSmall">
              {getEndLabel(metricCatalog.getMetric(metric))}
            </Typography>
          }
        />
      </Box>
    </Paper>
  );
};
