import React from "react";

import { useTheme } from "@mui/material";
import { curveMonotoneX } from "@visx/curve";
import { LinePath } from "@visx/shape";
import { LinePathProps } from "@visx/shape/lib/shapes/LinePath";
import { ScaleLinear, ScaleTime } from "d3-scale";
import { Timeseries, TimeseriesPoint } from "src/metrics";

export interface BaseLineChartProps {
  /**
   * Timeseries used to draw the line chart.
   */
  timeseries: Timeseries<number>;
  /**
   * d3-scale to convert between date points and pixel positions.
   */
  xScale: ScaleTime<number, number>;
  /**
   * d3-scale to convert between numerical points and pixel positions.
   */
  yScale: ScaleLinear<number, number>;
}

export type LineChartProps = BaseLineChartProps &
  React.SVGProps<SVGPathElement> &
  LinePathProps<TimeseriesPoint<number>>;

/**
 * LineChart is a chart building block that returns an SVG path element, given
 * a timeseries and x and y scales.
 *
 * LineChart is intended to be used as building block of more complex
 * charts, so it doesn't include axes, tooltips or anything else.
 * See Storybook for a working example.
 */

export const LineChart = ({
  timeseries,
  xScale,
  yScale,
  stroke,
  strokeWidth = 2,
  shapeRendering = "geometricPrecision",
  strokeLinejoin = "round",
  ...otherLineProps
}: LineChartProps) => {
  const theme = useTheme();
  return (
    <LinePath
      data={timeseries.points}
      x={(d) => xScale(d.date)}
      y={(d) => yScale(d.value)}
      curve={curveMonotoneX}
      shapeRendering={shapeRendering}
      strokeLinejoin={strokeLinejoin}
      stroke={stroke ?? theme.palette.chart.main}
      strokeWidth={strokeWidth}
      {...otherLineProps}
    />
  );
};
