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
  /**
   * RegionId of the state being mapped.
   */
  stateRegionId: string;
  /**
   * Region to highlight on the map by rendering the shape with an outline.
   */
  highlightedRegion?: Region;
  /**
   * Array of metrics that can be used to color the map.
   */
  metrics: (Metric | string)[];
  /**
   * Region DB instance.
   * Used for generating region links, coloring the map, etc.
   */
  regionDB: RegionDB;
  /**
   * Function that returns tooltip content for the region corresponding to a given regionId.
   *
   * @param {string} regionId RegionId of the region for which to get tooltip content.
   */
  getTooltip?: (regionId: string) => React.ReactNode;
}

export const MultiMetricUSStateMap = ({
  stateRegionId,
  highlightedRegion,
  metrics,
  regionDB,
  getTooltip,
}: MultiMetricUSStateMapProps) => {
  const metricCatalog = useMetricCatalog();

  const [metric, setMetric] = useState(metrics[0]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMetric(event.target.value);
  };

  const resolvedMetrics = metrics.map((metric: Metric | string) =>
    metricCatalog.getMetric(metric)
  );

  const defaultGetTooltip = (regionId: string) => {
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
              // transparent bottom border so the map doesn't shift by 1px when the hover border appears
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
          getTooltip={getTooltip ?? defaultGetTooltip}
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
