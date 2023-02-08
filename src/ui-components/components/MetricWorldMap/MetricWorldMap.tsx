import React from "react";

import { useTheme } from "@mui/material";

import { Metric } from "../../../metrics";
import { Region, RegionDB } from "../../../regions";
import { useDataForRegionsAndMetrics } from "../../common/hooks";
import { ComponentLoaded } from "../ComponentLoaded";
import { ComponentLoading } from "../ComponentLoading";
import { ErrorBox } from "../ErrorBox";
import { MetricMapTooltipContent } from "../MetricMapTooltipContent";
import WorldMap, { WorldMapProps } from "../WorldMap";

export interface MetricWorldMapProps
  extends Omit<WorldMapProps, "getRegionUrl" | "getTooltip"> {
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
 * MetricWorldMap is a world map colored by the current values of a given metric.
 * The region shapes are clickable and navigate to the respective region's location page.
 */

export const MetricWorldMap = ({
  metric,
  regionDB,
  width,
  getTooltip,
  ...otherProps
}: MetricWorldMapProps) => {
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

  const getTooltipInternal =
    getTooltip ??
    ((region) => <MetricMapTooltipContent region={region} metric={metric} />);

  return (
    <>
      <WorldMap
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
        {...otherProps}
      />
      {data ? <ComponentLoaded /> : <ComponentLoading />}
    </>
  );
};
