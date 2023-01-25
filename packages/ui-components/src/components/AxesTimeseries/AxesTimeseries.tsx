import React from "react";

import { ScaleLinear, ScaleTime } from "d3-scale";

import {
  AxisBottomProps,
  AxisLeft,
  AxisLeftProps,
  TimeAxisBottom,
} from "../Axis";

export interface AxesTimeseriesProps {
  /**
   * Height of y-axis.
   */
  height: number;
  /**
   * d3-scale to convert between date points and pixel positions.
   */
  xScale: ScaleTime<number, number>;
  /**
   * d3-scale to convert between numerical points and pixel positions.
   */
  yScale: ScaleLinear<number, number>;
  /**
   * The remaining AxisLeft props.
   */
  axisLeftProps?: Omit<AxisLeftProps, "scale">;
  /**
   * The remaining AxisBottom props.
   */
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
      <TimeAxisBottom top={height} scale={xScale} {...axisBottomProps} />
    </>
  );
};
