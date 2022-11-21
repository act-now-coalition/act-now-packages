import React from "react";
import { USStateMap } from "../USMaps";
import { useDataForRegionsAndMetrics } from "../../common/hooks";
import { getCountiesOfState } from "../../common/utils/maps";
import { Metric } from "@actnowcoalition/metrics";
import { RegionDB } from "@actnowcoalition/regions";
import { USStateMapProps } from "../USMaps";

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
  const state = regionDB.findByRegionIdStrict(stateRegionId);
  const countiesOfState = getCountiesOfState(regionDB, stateRegionId);
  const mapRegions = [...countiesOfState, state];

  const { data } = useDataForRegionsAndMetrics(mapRegions, [metric], false);

  if (!data) {
    return null;
  }

  return (
    <USStateMap
      getFillColor={(regionId: string) => {
        const region = regionDB.findByRegionId(regionId);
        return region ? data.metricData(region, metric).getColor() : "#eee";
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
