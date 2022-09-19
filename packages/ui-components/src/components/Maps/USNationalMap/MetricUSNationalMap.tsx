import React from "react";
import { USNationalMap } from "./USNationalMap";
import { MetricUSNationalMapProps } from "./interfaces";
import { states, counties, RegionDB } from "@actnowcoalition/regions";
import { useDataForRegionsAndMetrics } from "../../../common/hooks";

const statesAndCounties = new RegionDB([...states.all, ...counties.all]);

export const MetricUSNationalMap: React.FC<MetricUSNationalMapProps> = ({
  metric,
  showCounties,
  ...otherProps
}) => {
  const mapRegions = showCounties ? statesAndCounties.all : states.all;

  const { data } = useDataForRegionsAndMetrics(mapRegions, [metric], false);

  if (!data) {
    return null;
  }

  return (
    <USNationalMap
      getFillColor={(region) => data.metricData(region, metric).getColor()}
      showCounties={showCounties}
      {...otherProps}
    />
  );
};
