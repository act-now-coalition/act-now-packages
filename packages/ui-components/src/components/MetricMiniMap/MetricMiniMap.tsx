import React, { useState } from "react";
import { RegionDB, Region } from "@actnowcoalition/regions";
import { MetricUSStateMap } from "../Maps";
import { Box, Typography, Paper, TextField, MenuItem } from "@mui/material";
import { MetricLegendThreshold } from "../MetricLegendThreshold";
import { useMetricCatalog } from "../MetricCatalogContext";
import { Metric } from "@actnowcoalition/metrics";
import startCase from "lodash/startCase";
import { useTheme } from "@mui/material";

export interface MetricMiniMapProps {
  stateRegionId: string;
  currentRegion?: Region;
  metrics: (Metric | string)[];
  regionDB: RegionDB;
  renderTooltip: (regionId: string) => React.ReactElement | string;
}

function getStartLabel(metric: Metric): string {
  if (metric.levelSet) {
    const levels = metric.levelSet.levels;
    return startCase(levels[0].id);
  } else if (metric.categories) {
    return startCase(metric.categories[0].label);
  } else return "Low";
}

function getEndLabel(metric: Metric): string {
  if (metric.levelSet) {
    const levels = metric.levelSet.levels;
    return startCase(levels[levels.length - 1].id);
  } else if (metric.categories) {
    const categories = metric.categories;
    return startCase(categories[categories.length - 1].label);
  } else return "High";
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
  const [option, setOption] = useState(metrics[0]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOption(event.target.value);
  };
  return (
    <Paper sx={{ width: theme.spacing(39) }}>
      {metrics.length > 1 && (
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
              <Typography>{metricCatalog.getMetric(metric).name}</Typography>
            </MenuItem>
          ))}
        </TextField>
      )}
      <MetricUSStateMap
        stateRegionId={stateRegionId}
        currentRegion={currentRegion}
        metric={option}
        regionDB={regionDB}
        renderTooltip={renderTooltip}
      />
      <Box padding={3}>
        <MetricLegendThreshold
          orientation="horizontal"
          width={160}
          height={12}
          metric={option}
          showLabels={false}
          startLabel={
            <Typography variant="paragraphSmall">
              {getStartLabel(metricCatalog.getMetric(option))}
            </Typography>
          }
          endLabel={
            <Typography variant="paragraphSmall">
              {getEndLabel(metricCatalog.getMetric(option))}
            </Typography>
          }
        />
      </Box>
    </Paper>
  );
};
