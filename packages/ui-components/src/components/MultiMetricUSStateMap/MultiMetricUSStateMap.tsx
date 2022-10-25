import React, { useState } from "react";
import { RegionDB, Region } from "@actnowcoalition/regions";
import { MetricUSStateMap } from "../MetricUSMaps";
import { Typography, TextField, MenuItem } from "@mui/material";
import { MetricLegendThreshold } from "../MetricLegendThreshold";
import { useMetricCatalog } from "../MetricCatalogContext";
import { Metric } from "@actnowcoalition/metrics";
import { getStartLabel, getEndLabel } from "./utils";
import {
  BorderedContainer,
  BorderedContainerLast,
} from "./MultiMetricUSStateMap.style";

export interface MultiMetricUSStateMapProps {
  /** Region ID of the state being mapped */
  stateRegionId: string;
  /** Region corresponding to the page on which the component is being rendered */
  currentRegion?: Region;
  /** Array of metric options that can be used to color the map */
  metrics: (Metric | string)[];
  /** All regions to include on the map */
  regionDB: RegionDB;
  /** Function returning the contents of the map tooltip, given a hovered region */
  renderTooltip: (regionId: string) => React.ReactElement | string;
}

export const MultiMetricUSStateMap: React.FC<MultiMetricUSStateMapProps> = ({
  stateRegionId,
  currentRegion,
  metrics,
  regionDB,
  renderTooltip,
}) => {
  const metricCatalog = useMetricCatalog();

  const [metric, setMetric] = useState(metrics[0]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMetric(event.target.value);
  };

  const resolvedMetrics = metrics.map((metric: Metric | string) =>
    metricCatalog.getMetric(metric)
  );

  const defaultRenderTooltip = (regionId: string) => {
    return regionDB.findByRegionIdStrict(regionId).fullName;
  };

  return (
    <>
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
              /** transparent bottom border so the map doesn't shift by 1px when the hover border appears */
              borderBottom: "1px solid transparent",
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 0,
            },
          }}
        >
          {resolvedMetrics.map((metric: Metric) => (
            <MenuItem key={metric.id} value={metric.id}>
              <Typography>{metric.name}</Typography>
            </MenuItem>
          ))}
        </TextField>
      )}
      <BorderedContainer>
        <MetricUSStateMap
          stateRegionId={stateRegionId}
          currentRegion={currentRegion}
          metric={metric}
          regionDB={regionDB}
          renderTooltip={renderTooltip ?? defaultRenderTooltip}
        />
      </BorderedContainer>
      <BorderedContainerLast>
        <MetricLegendThreshold
          orientation="horizontal"
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
      </BorderedContainerLast>
    </>
  );
};
