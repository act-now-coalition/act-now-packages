import { USNationalMap, USNationalMapProps } from "../USNationalMap";

import { Metric } from "@actnowcoalition/metrics";
import React from "react";
import { RegionDB } from "@actnowcoalition/regions";
import { useDataForRegionsAndMetrics } from "../../common/hooks";

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

  if (!data) {
    return null;
  }

  return (
    <USNationalMap
      getFillColor={(regionId: string) => {
        const region = regionDB.findByRegionId(regionId);
        return region ? data.metricData(region, metric).getColor() : "#eee";
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
