import React from "react";
import { LinePath } from "@visx/shape";
import { curveMonotoneX } from "@visx/curve";
import { ScaleLinear, ScaleTime } from "d3-scale";
import { Timeseries, TimeseriesPoint } from "@actnowcoalition/metrics";
import { LinePathProps } from "@visx/shape/lib/shapes/LinePath";

interface LineChartOwnProps {
  timeseries: Timeseries<number>;
  xScale: ScaleTime<number, number>;
  yScale: ScaleLinear<number, number>;
}

export type LineChartProps = LineChartOwnProps &
  React.SVGProps<SVGPathElement> &
  LinePathProps<TimeseriesPoint<number>>;

const LineChart: React.FC<LineChartProps> = ({
  timeseries,
  xScale,
  yScale,
  ...otherLineProps
}) => {
  const data = timeseries.removeNils();
  return (
    <LinePath
      data={data.points}
      x={(d) => xScale(d.date)}
      y={(d) => yScale(d.value)}
      curve={curveMonotoneX}
      shapeRendering="geometricPrecision"
      strokeLinejoin="round"
      {...otherLineProps}
    />
  );
};

export default LineChart;
