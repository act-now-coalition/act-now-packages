import React from "react";

import { useTheme } from "@mui/material";

import { Metric } from "@actnowcoalition/metrics";
import { RegionDB } from "@actnowcoalition/regions";

import { useDataForRegionsAndMetrics } from "../../common/hooks";
import WorldMap, { WorldMapProps } from "../WorldMap";

export interface MetricWorldMapProps extends WorldMapProps {
  metric: Metric | string;
  regionDB: RegionDB;
}

export const MetricWorldMap = ({
  metric,
  regionDB,
  ...otherProps
}: MetricWorldMapProps) => {
  const theme = useTheme();
  const { data } = useDataForRegionsAndMetrics(regionDB.all, [metric], false);

  return (
    <WorldMap
      getFillColor={(regionId: string) => {
        const region = regionDB.findByRegionId(regionId);
        return region && data
          ? data.metricData(region, metric).getColor()
          : theme.palette.action.disabledBackground;
      }}
      getRegionUrl={(regionId: string) => {
        const region = regionDB.findByRegionId(regionId);
        const url = region ? regionDB.getRegionUrl(region) : undefined;
        return url;
      }}
      {...otherProps}
    />
  );
};
