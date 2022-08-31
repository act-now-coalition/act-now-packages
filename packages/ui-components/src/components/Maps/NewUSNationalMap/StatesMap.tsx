import React from "react";
import { GeoPath } from "d3-geo";
import Tooltip from "@mui/material/Tooltip";
import { StateOverlay, StateShape } from "./NewUSNationalMap.style";
import { statesGeographies } from "../../../common/geo-shapes";
import { states } from "@actnowcoalition/regions";

const StatesMap: React.FC<{
  width: number;
  height: number;
  geoPath: GeoPath;
  renderTooltip: (fips: string) => React.ReactElement | string;
  showCounties: boolean;
  getFillColor: (fips: string) => string;
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
                  // @ts-ignore (Chelsi) - figure out why 'd' prop is being problematic
                  <StateShape d={geoPath(geo)} fill={getFillColor(stateFips)} />
                )}
                {/* @ts-ignore (Chelsi) - figure out why 'd' prop is being problematic */}
                <StateOverlay data-track="map-state" d={geoPath(geo)} />
              </a>
            </g>
          </Tooltip>
        );
      })}
    </svg>
  );
};

export default StatesMap;
