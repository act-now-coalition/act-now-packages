import React from "react";
import { useDataForRegionsAndMetrics } from "../../../common/hooks";
import { USNationalMap } from "../../USMaps";
import { MetricUSNationalMapProps } from "../interfaces";

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
        return region && data.hasMetricData(region, metric)
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
