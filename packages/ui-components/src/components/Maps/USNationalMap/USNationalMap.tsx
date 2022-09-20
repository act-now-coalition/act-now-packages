import React from "react";
import { MapContainer, PositionAbsolute } from "../Maps.style";
import {
  defaultHeight,
  defaultScale,
  defaultWidth,
} from "../../../common/geo-shapes";
import { getCountyGeoId } from "../../../common/geo-shapes";
import { geoPath as d3GeoPath, geoAlbersUsa } from "d3-geo";
import StatesMap from "./StatesMap";
import CountiesMap from "./CountiesMap";
import { USNationalMapProps } from "./interfaces";
import { ParentSize } from "@visx/responsive";

const USNationalMapInner: React.FC<USNationalMapProps> = ({
  width = defaultWidth,
  renderTooltip,
  getFillColor = () => "lightGray",
  showCounties = false,
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
    <MapContainer>
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
