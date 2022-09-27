import React from "react";
import { useDataForRegionsAndMetrics } from "../../../common/hooks";
import { USNationalMap } from "./USNationalMap";
import { MetricUSNationalMapProps } from "./interfaces";

export const MetricUSNationalMap: React.FC<MetricUSNationalMapProps> = ({
  metric,
  regionDB,
  showCounties,
  ...otherProps
}) => {
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
      showCounties={showCounties}
      {...otherProps}
    />
  );
};
