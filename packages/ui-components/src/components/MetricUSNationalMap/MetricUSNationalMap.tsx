import React from "react";
import { useDataForRegionsAndMetrics } from "../../common/hooks";
import { USNationalMap, USNationalMapProps } from "../USNationalMap";
import { Metric } from "@actnowcoalition/metrics";
import { RegionDB } from "@actnowcoalition/regions";

export interface MetricUSNationalMapProps extends USNationalMapProps {
  metric: Metric | string;
  regionDB: RegionDB;
}

export const MetricUSNationalMap = ({
  metric,
  regionDB,
  showCounties,
  ...otherProps
}: MetricUSNationalMapProps) => {
  const { data } = useDataForRegionsAndMetrics(regionDB.all, [metric], false);

  return (
    <USNationalMap
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
      showCounties={showCounties}
      {...otherProps}
    />
  );
};
