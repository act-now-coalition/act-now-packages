import React, { useState } from "react";

import { MenuItem, TextField, Typography } from "@mui/material";

import { Metric } from "@actnowcoalition/metrics";
import { Region, RegionDB } from "@actnowcoalition/regions";

import { useMetricCatalog } from "../MetricCatalogContext";
import { MetricLegendThreshold } from "../MetricLegendThreshold";
import { MetricUSStateMap } from "../MetricUSStateMap";
import {
  BorderedContainer,
  BorderedContainerLast,
} from "./MultiMetricUSStateMap.style";
import { getEndLabel, getStartLabel } from "./utils";

export interface MultiMetricUSStateMapProps {
  /** Region ID of the state being mapped */
  stateRegionId: string;
  /** Optional region to highlight on the map */
  highlightedRegion?: Region;
  /** Array of metric options that can be used to color the map */
  metrics: (Metric | string)[];
  /** Region DB instance (used for generating region links, coloring the map, etc.) */
  regionDB: RegionDB;
  /** Function returning the contents of the map tooltip, given a hovered region */
  renderTooltip?: (regionId: string) => React.ReactNode;
}

export const MultiMetricUSStateMap = ({
  stateRegionId,
  highlightedRegion,
  metrics,
  regionDB,
  renderTooltip,
}: MultiMetricUSStateMapProps) => {
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
          highlightedRegion={highlightedRegion}
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
