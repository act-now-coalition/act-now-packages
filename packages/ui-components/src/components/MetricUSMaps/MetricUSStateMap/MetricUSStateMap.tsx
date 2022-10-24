import React from "react";
import { USStateMap } from "../../USMaps";
import { MetricUSStateMapProps } from "../interfaces";
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
        return region && data.hasMetricData(region, metric)
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
