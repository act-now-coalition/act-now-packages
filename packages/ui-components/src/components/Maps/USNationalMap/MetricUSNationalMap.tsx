import React, { useEffect, useState } from "react";
import { USNationalMap } from "./USNationalMap";
import { MetricUSNationalMapProps } from "./interfaces";
import { states, counties, RegionDB } from "@actnowcoalition/regions";
import { useDataForRegionsAndMetrics } from "../../../common/hooks";
import { generateFillColorMap } from "../../../common/utils/maps";

const statesAndCounties = new RegionDB([...states.all, ...counties.all]);

export const MetricUSNationalMap: React.FC<MetricUSNationalMapProps> = ({
  metric,
  showCounties,
  ...otherProps
}) => {
  const [mapRegions, setMapRegions] = useState(states.all);

  useEffect(() => {
    if (showCounties) {
      setMapRegions(statesAndCounties.all);
    }
    if (!showCounties) {
      setMapRegions(states.all);
    }
  }, [showCounties]);

  const { data } = useDataForRegionsAndMetrics(mapRegions, [metric], false);

  if (!data) {
    return null;
  }

  const regionIdToFillColorMap = generateFillColorMap(mapRegions, metric, data);

  return (
    <USNationalMap
      getFillColor={(region) =>
        regionIdToFillColorMap[region.regionId].fillColor
      }
      showCounties={showCounties}
      {...otherProps}
    />
  );
};
