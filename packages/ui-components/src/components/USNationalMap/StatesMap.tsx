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
   */
  getFillColor: (regionId: string) => string;
  /**
   * Function that returns the `regionUrl` for the region corresponding to a given regionId.
   * @default undefined
   *
   * @param regionId - RegionId of the region for which to get the regionUrl.
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
        return (
          <Tooltip key={stateFips} title={getTooltip(stateFips) ?? ""}>
            <Link href={getRegionUrl(stateFips)}>
              <g>
                {!showCounties && (
                  <RegionShapeBase
                    d={geoPath(geo) ?? ""}
                    fill={getFillColor(stateFips)}
                  />
                )}
                <RegionOverlay d={geoPath(geo) ?? ""} />
              </g>
            </Link>
          </Tooltip>
        );
      })}
    </svg>
  );
};

export default StatesMap;
