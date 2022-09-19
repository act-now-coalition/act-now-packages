import React from "react";
import { USStateMap } from "./USStateMap";
import { MetricUSStateMapProps } from "./interfaces";
import { useDataForRegionsAndMetrics } from "../../../common/hooks";
import { states } from "@actnowcoalition/regions";
import { getCountiesOfState } from "../../../common/utils/maps";

export const MetricUSStateMap: React.FC<MetricUSStateMapProps> = ({
  metric,
  stateRegionId,
  ...otherProps
}) => {
  const state = states.findByRegionIdStrict(stateRegionId);
  const countiesOfState = getCountiesOfState(stateRegionId);
  const mapRegions = [...countiesOfState, state];

  const { data } = useDataForRegionsAndMetrics(mapRegions, [metric], false);

  if (!data) {
    return null;
  }

  return (
    <USStateMap
      getFillColor={(region) => data.metricData(region, metric).getColor()}
      stateRegionId={stateRegionId}
      {...otherProps}
    />
  );
};
