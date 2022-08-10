import React from "react";
import { LinePath } from "@visx/shape";
import { ScaleLinear, ScaleTime } from "d3-scale";
import { Timeseries, TimeseriesPoint } from "@actnowcoalition/metrics";
import { LinePathProps } from "@visx/shape/lib/shapes/LinePath";

interface LineChartProps {
  timeseries: Timeseries<number>;
  xScale: ScaleTime<number, number>;
  yScale: ScaleLinear<number, number>;
}

const LineChart: React.FC<
  LineChartProps &
    React.SVGProps<SVGPathElement> &
    LinePathProps<TimeseriesPoint<number>>
> = ({ timeseries, xScale, yScale, ...otherLineProps }) => {
  const data = timeseries.removeNils();
  return (
    <LinePath
      {...otherLineProps}
      data={data.points}
      x={(d) => xScale(d.date)}
      y={(d) => yScale(d.value)}
    />
  );
};

export default LineChart;
