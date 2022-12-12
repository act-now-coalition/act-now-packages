import * as React from "react";

import { Link, Tooltip } from "@mui/material";
import { geoPath as d3GeoPath, geoMercator } from "d3-geo";

import { defaultWidth, nationsGeographies } from "../../common/geo-shapes";
import { MapContainer, RegionOverlay } from "../../styles/common/Maps.style";
import { AutoWidth } from "../AutoWidth";
import { DiagonalHatchPattern } from "./DiagonalHatchPattern";
import {
  DisputedAreaPath,
  DisputedBorderPath,
  colorDisputedAreas,
} from "./WorldMap.style";

export interface WorldMapProps {
  getTooltip: (regionId: string) => React.ReactNode;
  getFillColor?: (regionId: string) => string;
  getFillOpacity?: (geoId: string) => number;
  width?: number;
  getRegionUrl?: (regionId: string) => string | undefined;
}

// This aspect ratio and re-centering the projection maximize the land area
// shown in the map, leaving out the Arctic and Antarctica, but keeping most
// countries in the viewport.
const mapAspectRatio = 380 / 800;

// We adjust the geographic center of the projection 55°N 0°E to clip out
// areas close to the Arctic
const projectionCenter: [number, number] = [0, -55]; // [longitude, latitude]

const WorldMapInner = ({
  width = defaultWidth,
  getTooltip,
  getFillColor = () => `#ddd`,
  getFillOpacity = () => 1,
  getRegionUrl = () => undefined,
}: WorldMapProps) => {
  const data = nationsGeographies;
  const height = mapAspectRatio * width;

  const { countries, borders, disputedAreas, disputedBorders } = data;

  const projection = geoMercator()
    .fitWidth(width, countries)
    .center(projectionCenter);

  const geoPath = d3GeoPath(projection);

  return (
    <MapContainer>
      <svg width={width} height={height}>
        <defs>
          <DiagonalHatchPattern lineColor={colorDisputedAreas} />
        </defs>

        {/* Style-able nation shapes (ie. colorable by metric) */}
        {countries.features.map((geo) => (
          <path
            key={geo.id}
            d={geoPath(geo) || ""}
            fill={getFillColor(`${geo.id}`)}
            fillOpacity={getFillOpacity(`${geo.id}`)}
          />
        ))}

        {/* Clickable region overlay */}
        {countries.features.map((geo) => (
          <Tooltip key={geo.id} title={getTooltip(`${geo.id}`) ?? ""}>
            <Link href={getRegionUrl(`${geo.id}`)}>
              <RegionOverlay d={geoPath(geo) ?? ""} />
            </Link>
          </Tooltip>
        ))}

        {/* Nation Borders */}
        <path
          d={geoPath(borders) || ""}
          fill="none"
          stroke="white"
          strokeWidth={0.5}
        />

        {/* Disputed Areas */}
        {disputedAreas.features.map((geo, geoIndex) => (
          <DisputedAreaPath
            key={`disputed-area-${geoIndex}`}
            d={geoPath(geo) || ""}
            className={nameToClassName(geo.properties.name)}
          />
        ))}

        {/* Disputed Borders */}
        {disputedBorders.features.map((geo, geoIndex) => (
          <g key={`disputed-border-${geoIndex}`}>
            <DisputedBorderPath
              className="Background_Border"
              d={geoPath(geo) || ""}
            />
            <DisputedBorderPath
              className={nameToClassName(geo.properties.name)}
              d={geoPath(geo) || ""}
            />
          </g>
        ))}
      </svg>
    </MapContainer>
  );
};

const nameToClassName = (name: string) =>
  name
    .replaceAll(" ", "_")
    .replaceAll("&", "_")
    .replaceAll("(", "")
    .replaceAll(")", "");

const WorldMap = (props: WorldMapProps) => (
  <AutoWidth>
    <WorldMapInner {...props} />
  </AutoWidth>
);

/**
 * We memoize the component to prevent it from rendering multiple times
 * with the same props. Note that `getTooltip` and `getFillColor` need to
 * be memoized in the parent component for `React.memo` to work.
 *
 * https://reactjs.org/docs/hooks-reference.html#usecallback
 */
export default React.memo(WorldMap);
