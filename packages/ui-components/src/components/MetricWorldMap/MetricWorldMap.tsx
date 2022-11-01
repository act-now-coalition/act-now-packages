import React from "react";
import { useDataForRegionsAndMetrics } from "../../common/hooks";
import WorldMap from "../WorldMap";
import { MetricWorldMapProps } from "./interfaces";

export const MetricWorldMap: React.FC<MetricWorldMapProps> = ({
  metric,
  regionDB,
  ...otherProps
}) => {
  const { data } = useDataForRegionsAndMetrics(regionDB.all, [metric], false);

  if (!data) {
    return null;
  }

  return (
    <WorldMap
      getFillColor={(regionId: string) => {
        const region = regionDB.findByRegionId(regionId);
        return region ? data.metricData(region, metric).getColor() : "#eee";
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
