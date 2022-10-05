import React from "react";
import { GeoPath } from "d3-geo";
import { Tooltip, Link } from "@mui/material";
import { statesGeographies } from "../../../common/geo-shapes";
import { RegionOverlay, RegionShapeBase } from "../Maps.style";

const StatesMap: React.FC<{
  width: number;
  height: number;
  geoPath: GeoPath;
  renderTooltip: (regionId: string) => React.ReactElement | string;
  showCounties: boolean;
  getFillColor: (regionId: string) => string;
  getRegionUrl?: (regionId: string) => string | undefined;
}> = ({
  width,
  height,
  geoPath,
  renderTooltip,
  showCounties,
  getFillColor,
  getRegionUrl = () => undefined,
}) => {
  return (
    <svg width={width} height={height}>
      {statesGeographies.features.map((geo) => {
        const stateFips = `${geo.id}`;
        return (
          <Tooltip key={stateFips} title={renderTooltip(stateFips)}>
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
