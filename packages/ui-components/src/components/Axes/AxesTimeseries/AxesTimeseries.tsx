import React from "react";
import { AxisLeft, AxisBottom } from "../../Axis/Axis.style";
import { ScaleTime, ScaleLinear } from "d3-scale";

export interface AxesTimeseriesProps {
  height: number;
  dateScale: ScaleTime<number, number>;
  yScale: ScaleLinear<number, number>;
  yNumTicks?: number;
}

export const AxesTimeseries: React.FC<AxesTimeseriesProps> = ({
  height,
  dateScale,
  yScale,
  yNumTicks = 10,
}) => {
  return (
    <>
      <AxisLeft scale={yScale} numTicks={yNumTicks} />
      <AxisBottom top={height} scale={dateScale} />
    </>
  );
};
