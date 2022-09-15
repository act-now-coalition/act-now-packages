import React from "react";
import { USStateMap } from "./USStateMap";
import { MetricUSStateMapProps } from "./interfaces";
import { useDataForRegionsAndMetrics } from "../../../common/hooks";
import { states } from "@actnowcoalition/regions";
import {
  getCountiesOfState,
  generateFillColorMap,
} from "../../../common/utils/maps";

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

  const regionIdToFillColorMap = generateFillColorMap(mapRegions, metric, data);

  return (
    <USStateMap
      getFillColor={(region) =>
        regionIdToFillColorMap[region.regionId].fillColor
      }
      stateRegionId={stateRegionId}
      {...otherProps}
    />
  );
};
