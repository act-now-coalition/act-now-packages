import React from "react";
import { ExtendedFeature, GeoProjection } from "d3-geo";
import { countiesGeographies } from "../../../common/geo-shapes";
import CanvasMap from "./CanvasMap";

const CountiesMap: React.FC<{
  width: number;
  height: number;
  getFillColor: (regionId: string) => string;
  geoProjection: GeoProjection;
  getGeoId: (geo: ExtendedFeature) => string;
}> = (props) => (
  <CanvasMap {...props} features={countiesGeographies.features} />
);

export default CountiesMap;
