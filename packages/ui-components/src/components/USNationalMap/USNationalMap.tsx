import React from "react";

import { geoPath as d3GeoPath, geoAlbersUsa } from "d3-geo";

import {
  defaultHeight,
  defaultScale,
  defaultWidth,
  getCountyGeoId,
} from "../../common/geo-shapes";
import { BaseUSMapProps } from "../../common/utils/maps";
import { MapContainer, PositionAbsolute } from "../../styles/common/Maps.style";
import { AutoWidth } from "../AutoWidth";
import CountiesMap from "./CountiesMap";
import StatesMap from "./StatesMap";

export interface USNationalMapProps extends BaseUSMapProps {
  /**
   * Show the county shapes.
   * @default false
   */
  showCounties?: boolean;
}

const USNationalMapInner = ({
  width = defaultWidth,
  getTooltip,
  getFillColor = () => "lightGray",
  showCounties = false,
  getRegionUrl,
}: USNationalMapProps) => {
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
          getTooltip={getTooltip}
          showCounties={showCounties}
          getFillColor={getFillColor}
          getRegionUrl={getRegionUrl}
        />
      </PositionAbsolute>
    </MapContainer>
  );
};

export const USNationalMap = (props: USNationalMapProps) => (
  <AutoWidth>
    <USNationalMapInner {...props} />
  </AutoWidth>
);
