import React from "react";
import {
  AxisLeft,
  AxisLeftProps,
  AxisBottom,
  AxisBottomProps,
} from "../../Axis/Axis.style";
import { ScaleTime, ScaleLinear } from "d3-scale";

export interface AxesTimeseriesProps {
  height: number;
  dateScale: ScaleTime<number, number>;
  yScale: ScaleLinear<number, number>;
  axisLeftProps?: Omit<AxisLeftProps, "scale">;
  axisBottomProps?: Omit<AxisBottomProps, "scale">;
}

export const AxesTimeseries: React.FC<AxesTimeseriesProps> = ({
  height,
  dateScale,
  yScale,
  axisLeftProps,
  axisBottomProps,
}) => {
  return (
    <>
      <AxisLeft scale={yScale} {...axisLeftProps} />
      <AxisBottom top={height} scale={dateScale} {...axisBottomProps} />
    </>
  );
};
