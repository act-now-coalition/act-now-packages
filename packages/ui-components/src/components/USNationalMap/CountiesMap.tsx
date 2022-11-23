import { CanvasMap, CanvasMapProps } from "./CanvasMap";

import React from "react";
import { countiesGeographies } from "../../common/geo-shapes";

export type CountiesMapProps = Omit<CanvasMapProps, "features">;

const CountiesMap = (props: CountiesMapProps) => (
  <CanvasMap {...props} features={countiesGeographies.features} />
);

export default CountiesMap;
