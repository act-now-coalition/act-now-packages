import React from "react";
import { USStateMap, USStateMapProps } from "../USStateMap";
import { useDataForRegionsAndMetrics } from "../../common/hooks";
import { getCountiesOfState } from "../../common/utils/maps";
import { Metric } from "@actnowcoalition/metrics";
import { RegionDB } from "@actnowcoalition/regions";

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

  return (
    <USStateMap
      getFillColor={(regionId: string) => {
        const region = regionDB.findByRegionId(regionId);
        return region && data
          ? data.metricData(region, metric).getColor()
          : "#eee";
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
