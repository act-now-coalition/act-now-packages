import React from "react";
import { GeoPath } from "d3-geo";
import Tooltip from "@mui/material/Tooltip";
import { statesGeographies } from "../../../common/geo-shapes";
import { RegionOverlay, RegionShapeBase } from "../Maps.style";

const StatesMap: React.FC<{
  width: number;
  height: number;
  geoPath: GeoPath;
  renderTooltip: (regionId: string) => React.ReactElement | string;
  showCounties: boolean;
  getFillColor: (regionId: string) => string;
  getRegionUrl?: (regionId: string) => string;
}> = ({
  width,
  height,
  geoPath,
  renderTooltip,
  showCounties,
  getFillColor,
  getRegionUrl,
}) => {
  return (
    <svg width={width} height={height}>
      {statesGeographies.features.map((geo) => {
        const stateFips = `${geo.id}`;
        return (
          <Tooltip key={stateFips} title={renderTooltip(stateFips)}>
            <a href={getRegionUrl && getRegionUrl(stateFips)}>
              <g>
                {!showCounties && (
                  <RegionShapeBase
                    d={geoPath(geo) ?? ""}
                    fill={getFillColor(stateFips)}
                  />
                )}
                <RegionOverlay d={geoPath(geo) ?? ""} />
              </g>
            </a>
          </Tooltip>
        );
      })}
    </svg>
  );
};

export default StatesMap;
