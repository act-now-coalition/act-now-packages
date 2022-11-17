import React from "react";
import {
  AxisLeft,
  AxisLeftProps,
  AxisBottom,
  AxisBottomProps,
} from "../Axis/Axis.style";
import { ScaleTime, ScaleLinear } from "d3-scale";

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
