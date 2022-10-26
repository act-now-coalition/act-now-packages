import React from "react";
import { Tooltip } from "@mui/material";
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
  BorderingRegion,
  HighlightableShape,
  RegionOverlay,
} from "../Maps.style";
import { USStateMapProps } from "../interfaces";
import { AutoWidth } from "../../AutoWidth";

const USStateMapInner: React.FC<USStateMapProps> = ({
  stateRegionId,
  renderTooltip,
  getFillColor = () => "lightGray",
  width = defaultWidth,
  highlightedRegion,
  showCounties = true,
  showBorderingStates = true,
  getRegionUrl = () => undefined,
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

  const projection = geoProjection()
    .fitSize([width, height], stateGeo)
    .clipExtent([
      [0, 0],
      [width, height],
    ]);
  const geoPath = d3GeoPath().projection(projection);

  const regionsOfState = countiesGeographies.features.filter((geo) =>
    belongsToState(`${geo.id}`, stateRegionId)
  );

  const otherStates = statesGeographies.features.filter(
    (geo) => `${geo.id}` !== stateRegionId
  );

  const regionGeoToShow = showCounties ? regionsOfState : [stateGeo];

  // TODO(Pablo): Restore the state link once we update the RegionDB API
  return (
    <MapContainer>
      <svg width={width} height={height}>
        {/* Style-able region shapes (ie. colorable by metric) */}
        {regionGeoToShow.map((geo) => {
          const geoId = `${geo.id}`;
          const highlightShape = highlightedRegion?.regionId === geoId;
          return (
            <HighlightableShape
              key={geoId}
              d={geoPath(geo) ?? ""}
              fill={getFillColor(geoId)}
              highlight={highlightShape}
            />
          );
        })}

        {/* Bordering states */}
        {showBorderingStates &&
          otherStates.map((geo) => {
            const stateFips = `${geo.id}`;
            return (
              <Tooltip title={renderTooltip(stateFips) ?? ""} key={stateFips}>
                <a href={getRegionUrl(stateFips)}>
                  <g>
                    <BorderingRegion d={geoPath(geo) ?? ""} />
                  </g>
                </a>
              </Tooltip>
            );
          })}

        {/* Clickable region overlay */}
        {regionGeoToShow.map((geo) => {
          const geoId = `${geo.id}`;
          return (
            <Tooltip title={renderTooltip(geoId) ?? ""} key={geoId}>
              <a href={getRegionUrl(geoId)}>
                <g>
                  <RegionOverlay d={geoPath(geo) ?? ""} />
                </g>
              </a>
            </Tooltip>
          );
        })}
      </svg>
    </MapContainer>
  );
};

export const USStateMap: React.FC<USStateMapProps> = (props) => (
  <AutoWidth>
    <USStateMapInner {...props} />
  </AutoWidth>
);
