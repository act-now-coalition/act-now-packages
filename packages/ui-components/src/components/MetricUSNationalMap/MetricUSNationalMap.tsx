import React from "react";

import { useTheme } from "@mui/material";

import { Metric } from "@actnowcoalition/metrics";
import { RegionDB } from "@actnowcoalition/regions";

import { useDataForRegionsAndMetrics } from "../../common/hooks";
import { ErrorBox } from "../ErrorBox";
import { USNationalMap, USNationalMapProps } from "../USNationalMap";

export interface MetricUSNationalMapProps
  extends Omit<USNationalMapProps, "getRegionUrl"> {
  /**
   * Metric represented by the map's coloring.
   */
  metric: Metric | string;
  /**
   * Region DB instance.
   * Used for generating region links, coloring the map, etc.
   */
  regionDB: RegionDB;
}

/**
 * MetricUSStateMap is a US national map colored by the current values of a given metric.
 * The region shapes are clickable and navigate to the respective region's location page.
 */

export const MetricUSNationalMap = ({
  metric,
  regionDB,
  showCounties,
  width,
  ...otherProps
}: MetricUSNationalMapProps) => {
  const theme = useTheme();
  const { data, error } = useDataForRegionsAndMetrics(
    regionDB.all,
    [metric],
    false
  );
  if (error) {
    return (
      <ErrorBox width={width} height={width && width / 2}>
        Map could not be loaded.
      </ErrorBox>
    );
  }

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
