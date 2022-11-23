import { Link, Tooltip } from "@mui/material";
import { RegionOverlay, RegionShapeBase } from "../../styles/common/Maps.style";

import { GeoPath } from "d3-geo";
import React from "react";
import { statesGeographies } from "../../common/geo-shapes";

// TODO: improve upon this interface/make less redundant with other map prop interfaces
export interface StatesMapProps {
  width: number;
  height: number;
  geoPath: GeoPath;
  renderTooltip: (regionId: string) => React.ReactNode;
  showCounties: boolean;
  getFillColor: (regionId: string) => string;
  getRegionUrl?: (regionId: string) => string | undefined;
}

const StatesMap = ({
  width,
  height,
  geoPath,
  renderTooltip,
  showCounties,
  getFillColor,
  getRegionUrl = () => undefined,
}: StatesMapProps) => {
  return (
    <svg width={width} height={height}>
      {statesGeographies.features.map((geo) => {
        const stateFips = `${geo.id}`;
        return (
          <Tooltip key={stateFips} title={renderTooltip(stateFips) ?? ""}>
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
