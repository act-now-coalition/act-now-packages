import React from "react";
import { Tooltip, Link } from "@mui/material";
import { geoPath as d3GeoPath, geoAlbersUsa, geoMercator } from "d3-geo";
import {
  statesGeographies,
  countiesGeographies,
  defaultHeight,
  defaultWidth,
} from "../../common/geo-shapes";
import { belongsToState, BaseUSMapProps } from "../../common/utils/maps";
import {
  MapContainer,
  BorderingRegion,
  HighlightableShape,
  RegionOverlay,
} from "../../styles/common/Maps.style";
import { AutoWidth } from "../AutoWidth";
import { Region } from "@actnowcoalition/regions";

export interface USStateMapProps extends BaseUSMapProps {
  /** Region ID of the state being mapped */
  stateRegionId: string;
  /** Optional region to highlight on the map */
  highlightedRegion?: Region;
  showCounties?: boolean;
  showBorderingStates?: boolean;
}

const USStateMapInner = ({
  stateRegionId,
  renderTooltip,
  getFillColor = () => "lightGray",
  width = defaultWidth,
  highlightedRegion,
  showCounties = true,
  showBorderingStates = true,
  getRegionUrl = () => undefined,
}: USStateMapProps) => {
  const height = defaultHeight * (width / defaultWidth);

  const stateGeo = statesGeographies.features.find(
    (geo) => geo.id === stateRegionId
  );

  if (!stateGeo) {
    return null;
  }

  const mapSize: [number, number] = [width, height];
  // The geoAlbersUsa projection is designed to show the entire US in a
  // rectangular area with aspect ratio 960x500. With this projection,
  // some states appear "rotated", so we use the Mercator projection to
  // show a more familiar orientation.
  //
  // We can't use the Mercator projection for Alaska, because Alaska extends
  // beyond the west edge of the projection, so the math to calculate the
  // parameters to make it fit won't work. We fall back to geoAlbersUsa
  // in this case.
  //
  // Note: The geoAlbersUsa projection doesn't define `clipExtent`, so we
  // can't use it for Alaska.
  const projection =
    stateGeo.id === "02"
      ? geoAlbersUsa().fitSize(mapSize, stateGeo)
      : geoMercator()
          .fitSize(mapSize, stateGeo)
          .clipExtent([[0, 0], mapSize]);

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
                <Link href={getRegionUrl(stateFips)}>
                  <g>
                    <BorderingRegion d={geoPath(geo) ?? ""} />
                  </g>
                </Link>
              </Tooltip>
            );
          })}

        {/* Clickable region overlay */}
        {regionGeoToShow.map((geo) => {
          const geoId = `${geo.id}`;
          return (
            <Tooltip title={renderTooltip(geoId) ?? ""} key={geoId}>
              <Link href={getRegionUrl(geoId)}>
                <g>
                  <RegionOverlay d={geoPath(geo) ?? ""} />
                </g>
              </Link>
            </Tooltip>
          );
        })}
      </svg>
    </MapContainer>
  );
};

export const USStateMap = (props: USStateMapProps) => (
  <AutoWidth>
    <USStateMapInner {...props} />
  </AutoWidth>
);