import React from "react";

import { useTheme } from "@mui/material";

import { Metric } from "@actnowcoalition/metrics";
import { RegionDB } from "@actnowcoalition/regions";

import { useDataForRegionsAndMetrics } from "../../common/hooks";
import { getCountiesOfState } from "../../common/utils/maps";
import { USStateMap, USStateMapProps } from "../USStateMap";

export interface MetricUSStateMapProps extends USStateMapProps {
  metric: Metric | string;
  regionDB: RegionDB;
}

export const MetricUSStateMap = ({
  metric,
  stateRegionId,
  regionDB,
  ...otherProps
}: MetricUSStateMapProps) => {
  const theme = useTheme();
  const state = regionDB.findByRegionIdStrict(stateRegionId);
  const countiesOfState = getCountiesOfState(regionDB, stateRegionId);
  const mapRegions = [...countiesOfState, state];

  const { data } = useDataForRegionsAndMetrics(mapRegions, [metric], false);

  return (
    <USStateMap
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
      stateRegionId={stateRegionId}
      {...otherProps}
    />
  );
};
