import {
  AxisBottom,
  AxisBottomProps,
  AxisLeft,
  AxisLeftProps,
} from "../Axis/Axis.style";
import { ScaleLinear, ScaleTime } from "d3-scale";

import React from "react";

export interface AxesTimeseriesProps {
  height: number;
  xScale: ScaleTime<number, number>;
  yScale: ScaleLinear<number, number>;
  axisLeftProps?: Omit<AxisLeftProps, "scale">;
  axisBottomProps?: Omit<AxisBottomProps, "scale">;
}

export const AxesTimeseries = ({
  height,
  xScale,
  yScale,
  axisLeftProps,
  axisBottomProps,
}: AxesTimeseriesProps) => {
  return (
    <>
      <AxisLeft scale={yScale} {...axisLeftProps} />
      <AxisBottom top={height} scale={xScale} {...axisBottomProps} />
    </>
  );
};
