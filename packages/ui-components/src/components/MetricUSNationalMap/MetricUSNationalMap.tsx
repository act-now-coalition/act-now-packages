import React from "react";

import { useTheme } from "@mui/material";

import { Metric } from "@actnowcoalition/metrics";
import { RegionDB } from "@actnowcoalition/regions";

import { useDataForRegionsAndMetrics } from "../../common/hooks";
import { USNationalMap, USNationalMapProps } from "../USNationalMap";

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
  const theme = useTheme();
  const { data } = useDataForRegionsAndMetrics(regionDB.all, [metric], false);

  return (
    <USNationalMap
      getFillColor={(regionId: string) => {
        const region = regionDB.findByRegionId(regionId);
        return region && data
          ? data.metricData(region, metric).getColor()
          : theme.palette.action.disabledBackground;
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
