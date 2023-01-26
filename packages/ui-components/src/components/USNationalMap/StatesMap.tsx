import React from "react";

import { Link, Tooltip } from "@mui/material";
import { GeoPath } from "d3-geo";

import { statesGeographies } from "../../common/geo-shapes";
import { RegionOverlay, RegionShapeBase } from "../../styles/common/Maps.style";

// TODO: improve upon this interface/make less redundant with other map prop interfaces
export interface StatesMapProps {
  /**
   * Width of the SVG containing the map.
   */
  width: number;
  /**
   * Height of the SVG containing the map.
   */
  height: number;
  /**
   * Function that renders the geo path.
   */
  geoPath: GeoPath;
  /**
   * Function that returns tooltip content for the region corresponding to a given regionId.
   *
   * @param regionId - RegionId of the region for which to get tooltip content.
   * @returns Tooltip content for the region.
   */
  getTooltip: (regionId: string) => React.ReactNode;
  /**
   * Show the county shapes.
   */
  showCounties: boolean;
  /**
   * Function that returns the fill color for a region's shape, given the region's regionId.
   *
   * @param regionId - RegionId of the region for which to get the fill color.
   * @returns Fill color for the region.
   */
  getFillColor: (regionId: string) => string;
  /**
   * Function that returns the `regionUrl` for the region corresponding to a given regionId.
   * @default undefined
   *
   * @param regionId - RegionId of the region for which to get the regionUrl.
   * @returns Region URL for the region.
   */
  getRegionUrl?: (regionId: string) => string | undefined;
}

const StatesMap = ({
  width,
  height,
  geoPath,
  getTooltip,
  showCounties,
  getFillColor,
  getRegionUrl = () => undefined,
}: StatesMapProps) => {
  return (
    <svg width={width} height={height}>
      {statesGeographies.features.map((geo) => {
        const stateFips = `${geo.id}`;
        const regionUrl = getRegionUrl(stateFips);
        const innerShape = (
          <g>
            {!showCounties && (
              <RegionShapeBase
                d={geoPath(geo) ?? ""}
                fill={getFillColor(stateFips)}
              />
            )}
            <RegionOverlay d={geoPath(geo) ?? ""} />
          </g>
        );
        return (
          <Tooltip key={stateFips} title={getTooltip(stateFips) ?? ""}>
            {regionUrl ? (
              <Link href={regionUrl}>{innerShape}</Link>
            ) : (
              innerShape
            )}
          </Tooltip>
        );
      })}
    </svg>
  );
};

export default StatesMap;
