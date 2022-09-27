import React from "react";
import { USStateMap } from "./USStateMap";
import { MetricUSStateMapProps } from "./interfaces";
import { useDataForRegionsAndMetrics } from "../../../common/hooks";
import { getCountiesOfState } from "../../../common/utils/maps";

export const MetricUSStateMap: React.FC<MetricUSStateMapProps> = ({
  metric,
  stateRegionId,
  regionDB,
  ...otherProps
}) => {
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
      stateRegionId={stateRegionId}
      {...otherProps}
    />
  );
};
