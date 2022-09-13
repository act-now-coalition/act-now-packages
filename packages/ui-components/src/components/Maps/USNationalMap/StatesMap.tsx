import React from "react";
import { GeoPath } from "d3-geo";
import Tooltip from "@mui/material/Tooltip";
import { RegionOverlay, RegionShapeBase } from "../Maps.style";
import { statesGeographies } from "../../../common/geo-shapes";
import { Region, states } from "@actnowcoalition/regions";

const StatesMap: React.FC<{
  width: number;
  height: number;
  geoPath: GeoPath;
  renderTooltip: (regionId: string) => React.ReactElement | string;
  showCounties: boolean;
  getFillColor: (region: Region) => string;
}> = ({
  width,
  height,
  geoPath,
  renderTooltip,
  showCounties,
  getFillColor,
}) => {
  return (
    <svg width={width} height={height}>
      {statesGeographies.features.map((geo) => {
        const stateFips = `${geo.id}`;
        const state = states.findByRegionIdStrict(stateFips);
        return (
          <Tooltip key={stateFips} title={renderTooltip(stateFips)}>
            <g>
              <a href={state.relativeUrl}>
                {!showCounties && (
                  <RegionShapeBase
                    d={geoPath(geo) ?? ""}
                    fill={getFillColor(state)}
                  />
                )}
                <RegionOverlay d={geoPath(geo) ?? ""} />
              </a>
            </g>
          </Tooltip>
        );
      })}
    </svg>
  );
};

export default StatesMap;
