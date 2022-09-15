import React, { useEffect, useState } from "react";
import { USNationalMap } from "./USNationalMap";
import { MetricUSNationalMapProps } from "./interfaces";
import { states, counties, RegionDB } from "@actnowcoalition/regions";
import { keyBy } from "lodash";
import { useDataForRegionsAndMetrics } from "../../../common/hooks";

const statesAndCounties = new RegionDB([...states.all, ...counties.all]);

interface FillColorForRegionId {
  [regionId: string]: {
    regionId: string;
    fillColor: string;
  };
}

export const MetricUSNationalMap: React.FC<MetricUSNationalMapProps> = ({
  metric,
  showCounties,
  ...otherProps
}) => {
  const [regionsToRender, setRegionsToRender] = useState(states.all);

  useEffect(() => {
    if (showCounties) {
      setRegionsToRender(statesAndCounties.all);
    }
    if (!showCounties) {
      setRegionsToRender(states.all);
    }
  }, [showCounties]);

  const { data } = useDataForRegionsAndMetrics(
    regionsToRender,
    [metric],
    false
  );

  if (!data) {
    return null;
  }

  const regionIdAndFillColor = regionsToRender.map((region) => {
    const currentValue = data.metricData(region, metric)?.currentValue;
    const metricFromData = data.metricData(region, metric).metric;
    return {
      regionId: region.regionId,
      fillColor: metricFromData.getColor(currentValue),
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
      showCounties={showCounties}
      {...otherProps}
    />
  );
};
