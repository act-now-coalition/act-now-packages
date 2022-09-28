import React from "react";
import { ParentSize } from "@visx/responsive";
import { geoPath as d3GeoPath, geoAlbersUsa } from "d3-geo";
import {
  defaultHeight,
  defaultScale,
  defaultWidth,
  getCountyGeoId,
} from "../../../common/geo-shapes";
import { MapContainer, PositionAbsolute } from "../Maps.style";
import StatesMap from "./StatesMap";
import CountiesMap from "./CountiesMap";
import { USNationalMapProps } from "./interfaces";

const USNationalMapInner: React.FC<USNationalMapProps> = ({
  width = defaultWidth,
  renderTooltip,
  getFillColor = () => "lightGray",
  showCounties = false,
  getRegionUrl,
}) => {
  const height = defaultHeight * (width / defaultWidth);
  const scale = (defaultScale * width) / defaultWidth;

  const projection = geoAlbersUsa()
    .scale(scale)
    .translate([width / 2, height / 2]);

  const canvasProjection = geoAlbersUsa()
    .scale(2 * scale)
    .translate([width, height]);

  const geoPath = d3GeoPath().projection(projection);

  return (
    // We need to be explicit in declaring the height of the national map's container
    // because of the component pieces' absolute positioning.
    <MapContainer height={height}>
      {showCounties && (
        <PositionAbsolute>
          <CountiesMap
            width={width}
            height={height}
            getFillColor={getFillColor}
            geoProjection={canvasProjection}
            getGeoId={getCountyGeoId}
          />
        </PositionAbsolute>
      )}
      <PositionAbsolute>
        <StatesMap
          width={width}
          height={height}
          geoPath={geoPath}
          renderTooltip={renderTooltip}
          showCounties={showCounties}
          getFillColor={getFillColor}
          getRegionUrl={getRegionUrl}
        />
      </PositionAbsolute>
    </MapContainer>
  );
};

export const USNationalMap: React.FC<USNationalMapProps> = (props) => (
  <ParentSize>
    {({ width }) => <USNationalMapInner width={width} {...props} />}
  </ParentSize>
);
