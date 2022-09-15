// import React, { useEffect, useState } from "react";
import React from "react";
import { useMetricCatalog } from "../../MetricCatalogContext";
import { USNationalMap } from "./USNationalMap";
import { useMetricMapFillColor } from "../../../common/hooks";
import { MetricUSNationalMapProps } from "./interfaces";
import { states, counties, RegionDB } from "@actnowcoalition/regions";
import { keyBy } from "lodash";

const statesAndCounties = new RegionDB([...states.all, ...counties.all]);

interface FillColorForRegionId {
  [regionId: string]: {
    regionId: string;
    fillColor: string;
  };
}

export const MetricUSNationalMap: React.FC<MetricUSNationalMapProps> = ({
  metric,
  ...otherProps
}) => {
  // const [regionsToRender, setRegionsToRender] = useState(states.all)

  // useEffect(() => {
  //   if (showCounties) {
  //     setRegionsToRender(statesAndCounties.all)
  //   } if (!showCounties) {
  //     setRegionsToRender(states.all)
  //   }
  // }, [showCounties])

  const metricCatalog = useMetricCatalog();

  if (!metricCatalog) {
    return null;
  }

  // const regionIdAndFillColor = regionsToRender.map((region) => {
  const regionIdAndFillColor = statesAndCounties.all.map((region) => {
    return {
      regionId: region.regionId,
      fillColor: useMetricMapFillColor(metricCatalog, metric, region),
    };
  });

  const regionIdToFillColorMap: FillColorForRegionId = keyBy(
    regionIdAndFillColor,
    (item) => item.regionId
  );

  return (
    <USNationalMap
      getFillColor={(region) =>
        regionIdToFillColorMap[region.regionId].fillColor
      }
      {...otherProps}
    />
  );
};
