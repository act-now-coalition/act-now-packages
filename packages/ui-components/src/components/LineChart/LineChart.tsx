import { Timeseries, TimeseriesPoint } from "@actnowcoalition/metrics";
import { useTheme } from "@mui/material";
import { curveMonotoneX } from "@visx/curve";
import { LinePath } from "@visx/shape";
import { LinePathProps } from "@visx/shape/lib/shapes/LinePath";
import { ScaleLinear, ScaleTime } from "d3-scale";
import React from "react";

export interface BaseLineChartProps {
  /** Timeseries used to draw the line chart */
  timeseries: Timeseries<number>;

  /** d3-scale to transform point dates to pixel positions on the x-axis */
  xScale: ScaleTime<number, number>;

  /** d3-scale to transform point values to pixel positions on the y-axis */
  yScale: ScaleLinear<number, number>;
}

export type LineChartProps = BaseLineChartProps &
  React.SVGProps<SVGPathElement> &
  LinePathProps<TimeseriesPoint<number>>;

/**
 * LineChart is a chart building block that return an SVG path element, given
 * a timeseries and x and y scales.
 *
 * The LineChart is intended to be used as building block of more complex
 * charts, so it doesn't include axes, tooltips or anything else. See
 * Storybook for a working example.
 *
 * @example
 * ```tsx
 * const xScale = scaleUtc({ domain: [minDate, maxDate], range: [0, 200] });
 * const yScale = scaleLinear({ domain: [minVal, maxVal], range: [100, 0] });
 *
 * return (
 *   <svg>
 *     <BarChart ... />
 *     <LineChart
 *       timeseries={timeseries}
 *       xScale={xScale}
 *       yScale={yScale}
 *       stroke="blue"
 *       strokeDasharray="4 4"
 *     />
 *   </svg>
 * );
 * ```
 *
 * @param timeseries Timeseries to represent as a line.
 * @param xScale d3-scale to transform point dates to pixel positions on the x-axis.
 * @param yScale d3-scale to transform point values to pixel positions on the y-axis.
 *
 * @returns SVG Path element
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
