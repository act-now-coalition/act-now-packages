import React from "react";
import { AxisLeft, AxisBottom } from "../../Axis/Axis.style";
import { ScaleTime, ScaleLinear } from "d3-scale";
import { TimeUnit } from "@actnowcoalition/time-utils";
import { getTimeAxisTicks, getXTickFormat } from "../../../common/utils/charts";

export interface AxesTimeseriesProps {
  height: number;
  dateScale: ScaleTime<number, number>;
  yScale: ScaleLinear<number, number>;
  yNumTicks?: number;
  xTickTimeUnit?: TimeUnit;
}

export const AxesTimeseries: React.FC<AxesTimeseriesProps> = ({
  height,
  dateScale,
  yScale,
  yNumTicks = 10,
  xTickTimeUnit = TimeUnit.MONTHS,
}) => {
  const [dateFrom, dateTo] = dateScale.domain();
  const timeTicks = getTimeAxisTicks(dateFrom, dateTo, xTickTimeUnit);

  return (
    <>
      <AxisLeft scale={yScale} numTicks={yNumTicks} />
      <AxisBottom
        top={height}
        scale={dateScale}
        tickValues={timeTicks}
        tickFormat={(date: Date) => getXTickFormat(date, xTickTimeUnit)}
      />
    </>
  );
};
