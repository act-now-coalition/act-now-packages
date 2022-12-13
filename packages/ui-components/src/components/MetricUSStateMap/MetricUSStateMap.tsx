import React from "react";

import { useTheme } from "@mui/material";

import { Metric } from "@actnowcoalition/metrics";
import { RegionDB } from "@actnowcoalition/regions";

import { useDataForRegionsAndMetrics } from "../../common/hooks";
import { getCountiesOfState } from "../../common/utils/maps";
import { ErrorBox } from "../ErrorBox";
import { USStateMap, USStateMapProps } from "../USStateMap";

export interface MetricUSStateMapProps extends USStateMapProps {
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
 * MetricUSStateMap is a US state map colored by the current values of a given metric.
 * The region shapes are clickable and navigate to the respective region's location page.
 */

export const MetricUSStateMap = ({
  metric,
  stateRegionId,
  regionDB,
  width,
  ...otherProps
}: MetricUSStateMapProps) => {
  const theme = useTheme();
  const state = regionDB.findByRegionIdStrict(stateRegionId);
  const countiesOfState = getCountiesOfState(regionDB, stateRegionId);
  const mapRegions = [...countiesOfState, state];

  const { data, error } = useDataForRegionsAndMetrics(
    mapRegions,
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
    <USStateMap
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
      stateRegionId={stateRegionId}
      {...otherProps}
    />
  );
};
