import React from "react";
import { Tooltip } from "@mui/material";
import { counties, RegionDB, states } from "@actnowcoalition/regions";
import { geoPath as d3GeoPath, geoAlbersUsa, geoMercator } from "d3-geo";
import {
  statesGeographies,
  countiesGeographies,
  defaultHeight,
  defaultWidth,
} from "../../../common/geo-shapes";
import { belongsToState } from "../../../common/utils/maps";
import {
  MapContainer,
  StateGrey,
  CountyOrCongressionalDistrictShape,
  RegionOverlay,
} from "../Maps.style";
import { RenderMapProps } from "../interfaces";

const countiesAndStates = new RegionDB([...states.all, ...counties.all]);

export interface USStateMapProps extends RenderMapProps {
  stateRegionId: string;
  showCounties?: boolean;
  showBorderingStates?: boolean;
}

export const USStateMap: React.FC<USStateMapProps> = ({
  stateRegionId,
  renderTooltip,
  getFillColor = () => "white",
  width = defaultWidth,
  showCounties = true,
  showBorderingStates = true,
}) => {
  const height = defaultHeight * (width / defaultWidth);

  const stateGeo = statesGeographies.features.find(
    (geo) => geo.id === stateRegionId
  );

  if (!stateGeo) {
    return null;
  }

  // The geoAlbersUsa projection is designed to show the entire US in a
  // rectangular area with aspect ratio 960x500. With this projection,
  // some states appear "rotated", so we use the Mercator projection to
  // show a more familiar orientation.
  //
  // We can't use the Mercator projection for Alaska, because Alaska extends
  // beyond the west edge of the projection, so the math to calculate the
  // parameters to make it fit won't work. We fall back to geoAlbersUsa
  // in this case.
  const geoProjection = stateGeo.id === "02" ? geoAlbersUsa : geoMercator;

  const projection = geoProjection().fitSize([width, height], stateGeo);
  const geoPath = d3GeoPath().projection(projection);

  const regionsOfState = countiesGeographies.features.filter((geo) =>
    belongsToState(`${geo.id}`, stateRegionId)
  );

  const otherStates = statesGeographies.features.filter(
    (geo) => geo.id !== stateRegionId
  );

  const regionGeoToShow = showCounties ? regionsOfState : [stateGeo];

  return (
    <MapContainer>
      <svg width={width} height={height}>
        {/* Style-able region shapes (ie. colorable by metric) */}
        {regionGeoToShow.map((geo) => {
          return (
            <CountyOrCongressionalDistrictShape
              key={geo.id}
              d={geoPath(geo) ?? ""}
              fill={getFillColor(`${geo.id}`)}
              highlight={false}
            />
          );
        })}

        {/* Bordering states */}
        {showBorderingStates &&
          otherStates.map((geo) => {
            const stateFips = `${geo.id}`;
            const state = states.findByRegionIdStrict(stateFips);
            return (
              <Tooltip title={renderTooltip(state.regionId)} key={geo.id}>
                <g>
                  <a href={state.relativeUrl}>
                    <StateGrey d={geoPath(geo) ?? ""} />
                  </a>
                </g>
              </Tooltip>
            );
          })}

        {/* Clickable region overlay */}
        {regionGeoToShow.map((geo) => {
          const region = countiesAndStates.findByRegionIdStrict(`${geo.id}`);
          return (
            <Tooltip title={renderTooltip(region.regionId)} key={geo.id}>
              <g>
                <a href={region.relativeUrl}>
                  <RegionOverlay d={geoPath(geo) ?? ""} />
                </a>
              </g>
            </Tooltip>
          );
        })}
      </svg>
    </MapContainer>
  );
};
