import React from "react";
import { countiesGeographies } from "../../common/geo-shapes";
import { CanvasMap, CanvasMapProps } from "./CanvasMap";

export type CountiesMapProps = Omit<CanvasMapProps, "features">;

const CountiesMap = (props: CountiesMapProps) => (
  <CanvasMap {...props} features={countiesGeographies.features} />
);

export default CountiesMap;
