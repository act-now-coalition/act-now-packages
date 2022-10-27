import React from "react";
import { ScaleLinear, ScaleTime } from "d3-scale";
import { Group } from "@visx/group";
import { Timeseries } from "@actnowcoalition/metrics";

import { LineChart } from "../LineChart";
import { RectClipGroup } from "../RectClipGroup";

export interface LineThresholdInterval {
  /** Upper bound of the interval, in data units. */
  upper: number;
  /** Lower bound of the interval, in data units. */
  lower: number;
  /** Color to use to render the line in the interval. */
  color: string;
}

export interface LineThresholdChartProps {
  /**
   * Array defining the intervals on the y-axis on which the line will
   * be rendered with the color specified in the interval.
   */
  intervals: LineThresholdInterval[];
  /** Timeseries to render as a line */
  timeseries: Timeseries<number>;
  /** d3-scale to transform point dates to pixel positions on the x-axis */
  yScale: ScaleLinear<number, number>;
  /** d3-scale to transform point values to pixel positions on the y-axis */
  xScale: ScaleTime<number, number>;
}

/**
 * The `LineThresholdChart` component is a chart building block that renders
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
 *     />
 *   </svg>
 * )
 * ```
 *
 * In this case, the line will be rendered in green where its y-coordinates are
 * between 10 and 20, and in red where its y-coordinates are between 20 and 40.
 * If the timeseries has values outside these intervals, those line segments
 * won't be rendered.
 *
 * @param timeseries Timeseries to represent as a line.
 * @param xScale d3-scale to transform point dates to pixel positions on the x-axis.
 * @param yScale d3-scale to transform point values to pixel positions on the y-axis.
 * @param intervals intervals that define the color of the line for different segments.
 *
 * @returns An SVG group containing the line.
 */
export const LineThresholdChart = ({
  timeseries,
  xScale,
  yScale,
  intervals,
}: LineThresholdChartProps) => {
  const [xMin, xMax] = xScale.range();
  const width = Math.abs(xMax - xMin);

  return (
    <Group>
      {intervals.map((interval, intervalIndex) => {
        const yFrom = yScale(interval.lower);
        const yTo = yScale(interval.upper);
        const clipHeight = Math.abs(yFrom - yTo);
        return (
          <RectClipGroup
            key={`rect-clip-${intervalIndex}`}
            y={Math.min(yFrom, yTo)}
            width={width}
            height={clipHeight}
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
