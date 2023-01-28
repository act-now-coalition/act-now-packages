import React from "react";

import { Group } from "@visx/group";
import { ScaleLinear, ScaleTime } from "d3-scale";
import { Timeseries } from "src/metrics";

import { LineChart } from "../LineChart";
import { RectClipGroup } from "../RectClipGroup";

export interface LineIntervalChartProps {
  /**
   * Array of LineInterval items defining the intervals
   * on the y-axis, on which the line is rendered with the
   * specified color.
   */
  intervals: LineInterval[];
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
  /**
   * Offset of the y-axis, to pad the highest point on the chart.
   * @default 5
   */
  topIntervalOffset?: number;
}

export interface LineInterval {
  /**
   * Upper bound of the interval, in data units.
   */
  upper: number;
  /**
   * Lower bound of the interval, in data units.
   */
  lower: number;
  /**
   * Color to use to render the line in the interval.
   */
  color: string;
}

/**
 * LineIntervalChart is a chart building block that renders
 * a timeseries as a line colored according to the value of the y-coordinate
 * of each point in the line, as defined in the `intervals`.
 *
 * @example
 * ```tsx
 * const intervals = [
 *   { lower: 10, upper: 20, color: "green" },
 *   { lower: 20, upper: 40, color: "red" }
 * ]
 *
 * return (
 *   <svg width={width} height={height}>
 *     <LineThresholdChart
 *       timeseries={timeseries}
 *       xScale={xScale}
 *       yScale={yScale}
 *       intervals={intervals}
 *       topIntervalOffset={5}
 *     />
 *   </svg>
 * )
 * ```
 *
 * In this case, the line will be rendered in green where its y-coordinates are
 * between 10 and 20, and in red where its y-coordinates are between 20 and 40.
 * If the timeseries has values outside these intervals, those line segments
 * won't be rendered.
 */

export const LineIntervalChart = ({
  timeseries,
  xScale,
  yScale,
  intervals,
  topIntervalOffset,
}: LineIntervalChartProps) => {
  const [xMin, xMax] = xScale.range();
  const width = Math.abs(xMax - xMin);
  // Find the lowest y-coordinate, regardless of how the intervals are ordered.
  const topPoint = Math.min(
    ...intervals.map((interval) =>
      Math.min(yScale(interval.lower), yScale(interval.upper))
    )
  );
  return (
    <Group>
      {intervals.map((interval, intervalIndex) => {
        const yFrom = yScale(interval.lower);
        const yTo = yScale(interval.upper);
        const clipHeight = Math.abs(yFrom - yTo);
        const topOffset =
          topIntervalOffset && Math.min(yFrom, yTo) === topPoint
            ? topIntervalOffset
            : 0;
        return (
          <RectClipGroup
            key={`rect-clip-${intervalIndex}`}
            y={Math.min(yFrom, yTo) - topOffset}
            width={width}
            height={clipHeight + topOffset}
          >
            <LineChart
              timeseries={timeseries}
              xScale={xScale}
              yScale={yScale}
              stroke={interval.color}
            />
          </RectClipGroup>
        );
      })}
    </Group>
  );
};
