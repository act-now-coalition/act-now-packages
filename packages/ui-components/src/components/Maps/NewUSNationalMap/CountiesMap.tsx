import React from "react";
import { ExtendedFeature, GeoProjection } from "d3-geo";
import CanvasMap from "./CanvasMap";
import { countiesGeographies } from "../../../common/geo-shapes";

const CountiesMap: React.FC<{
  width: number;
  height: number;
  getFillColor: (fipsCode: string) => string;
  geoProjection: GeoProjection;
  getGeoId: (geo: ExtendedFeature) => string;
}> = (props) => (
  <CanvasMap {...props} features={countiesGeographies.features} />
);

export default CountiesMap;
