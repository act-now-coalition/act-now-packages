import React from "react";
import { useDataForRegionsAndMetrics } from "../../common/hooks";
import WorldMap, { WorldMapProps } from "../WorldMap";
import { Metric } from "@actnowcoalition/metrics";
import { RegionDB } from "@actnowcoalition/regions";

export interface MetricWorldMapProps extends WorldMapProps {
  metric: Metric | string;
  regionDB: RegionDB;
}

export const MetricWorldMap = ({
  metric,
  regionDB,
  ...otherProps
}: MetricWorldMapProps) => {
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
