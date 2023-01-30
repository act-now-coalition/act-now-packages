import React from "react";

import { useTheme } from "@mui/material";

import { Metric } from "../../../metrics";
import { Region, RegionDB } from "../../../regions";
import { useDataForRegionsAndMetrics } from "../../common/hooks";
import { getCountiesOfState } from "../../common/utils/maps";
import { ComponentLoaded } from "../ComponentLoaded";
import { ErrorBox } from "../ErrorBox";
import { MetricMapTooltipContent } from "../MetricMapTooltipContent";
import { USStateMap, USStateMapProps } from "../USStateMap";

export interface MetricUSStateMapProps
  extends Omit<USStateMapProps, "getRegionUrl" | "getTooltip"> {
  /**
   * Metric represented by the map's coloring.
   */
  metric: Metric | string;
  /**
   * Region DB instance.
   * Used for generating region links, coloring the map, etc.
   */
  regionDB: RegionDB;
  /**
   * Function that returns tooltip content for a given region.
   *
   * @param region - Region for which to get tooltip content.
   * @returns Tooltip content for the region.
   */
  getTooltip?: (region: Region) => React.ReactNode;
}

/**
 * MetricUSStateMap is a US state map colored by the current values of a given metric.
 * The region shapes are clickable and navigate to the respective region's location page.
 */

export const MetricUSStateMap = ({
  metric,
  stateRegionId,
  regionDB,
  getTooltip,
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

  const getTooltipInternal =
    getTooltip ??
    ((region) => <MetricMapTooltipContent region={region} metric={metric} />);

  return (
    <>
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
        getTooltip={(regionId: string) => {
          const region = regionDB.findByRegionId(regionId);
          return region && getTooltipInternal(region);
        }}
        stateRegionId={stateRegionId}
        {...otherProps}
      />
      {data && <ComponentLoaded />}
    </>
  );
};
