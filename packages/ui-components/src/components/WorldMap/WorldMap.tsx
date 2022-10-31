import * as React from "react";
import { Tooltip } from "@mui/material";
import { geoMercator, geoPath as d3GeoPath } from "d3-geo";
import {
  DisputedAreaPath,
  DisputedBorderPath,
  colorDisputedAreas,
} from "./WorldMap.style";
import DiagonalHatchPattern from "./DiagonalHatchPattern";
import { AutoWidth } from "../AutoWidth";
import { defaultWidth, nationsGeographies } from "../../common/geo-shapes";
import { MapContainer } from "../USMaps/Maps.style";
import { WorldMapProps } from "./interfaces";
import { RegionOverlay } from "../USMaps/Maps.style";

// This aspect ratio and re-centering the projection maximize the land area
// shown in the map, leaving out the Arctic and Antarctica, but keeping most
// countries in the viewport.
const mapAspectRatio = 380 / 800;

// We adjust the geographic center of the projection 55°N 0°E to clip out
// areas close to the Arctic
const projectionCenter: [number, number] = [0, -55]; // [longitude, latitude]

const WorldMapInner: React.FC<WorldMapProps> = ({
  width = defaultWidth,
  renderTooltip,
  getFillColor = () => `#ddd`,
  getFillOpacity = () => 1,
  getRegionUrl = () => undefined,
}) => {
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
          <>
            <path
              d={geoPath(geo) || ""}
              fill={getFillColor(`${geo.id}`)}
              fillOpacity={getFillOpacity(`${geo.id}`)}
            />
          </>
        ))}

        {/* Clickable region overlay */}
        {countries.features.map((geo) => (
          <>
            <Tooltip title={renderTooltip(`${geo.id}`) ?? ""}>
              <a href={getRegionUrl(`${geo.id}`)}>
                <RegionOverlay d={geoPath(geo) ?? ""} />
              </a>
            </Tooltip>
          </>
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

const WorldMap: React.FC<WorldMapProps> = (props) => (
  <AutoWidth>
    <WorldMapInner {...props} />
  </AutoWidth>
);

/**
 * We memoize the component to prevent it from rendering multiple times
 * with the same props. Note that `renderTooltip` and `getFillColor` need to
 * be memoized in the parent component for `React.memo` to work.
 *
 * https://reactjs.org/docs/hooks-reference.html#usecallback
 */
export default React.memo(WorldMap);
