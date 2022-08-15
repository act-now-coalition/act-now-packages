import React from "react";
import { ScaleLinear, ScaleTime } from "d3-scale";
import { Group } from "@visx/group";

import { Timeseries } from "@actnowcoalition/metrics";

export interface BarChartOwnProps {
  /** Timeseries used to draw the line chart */
  timeseries: Timeseries<number>;

  /** Scale to transform point dates to pixel positions on the x-axis */
  xScale: ScaleTime<number, number>;

  /** Scale to transform point values to piel position on the y-axis */
  yScale: ScaleLinear<number, number>;

  /** Width of each bar, in pixels */
  barWidth?: number;
}

export type BarChartProps = BarChartOwnProps & React.SVGProps<SVGRectElement>;

/**
 * BarChart is a chart to represent a Timeseries as a series of bars, one bar
 * for each point in the series.
 *
 * The horizontal center of the rectangles will be aligned with the date of its
 * corresponding point, make sure to adjust the chart paddings accordingly.
 *
 * By default, the bar width corresponds to the distance between two
 * consecutive days.
 *
 * @example
 * ```tsx
 * const xScale = scaleTime({ domain: [minDate, maxDate], range: [0, width] });
 * const yScale = scaleLinear({ domain: [minValue, maxValue], range: [0, height] });
 *
 * <svg width={width} height={height}>
 *   <BarChart
 *     timeseries={timeseries}
 *     xScale={xScale}
 *     yScale={yScale}
 *   />
 * </svg>
 * ```
 *
 * @param timeseries Timeseries to represent as a bar chart.
 * @param xScale d3-scale to transform dates into pixel positions on the x-axis
 * @param yScale d3-scale to transform values into pixel heights of each bar.
 * @param barWidth width (in pixels) of each bar.
 *
 * @returns An SVG Group element
 */
const BarChart: React.FC<BarChartProps> = ({
  timeseries,
  xScale,
  yScale,
  barWidth,
  ...rectProps
}) => {
  // We need minDate to calculate the bar width, so we return early if the
  // timeseries is empty.
  if (!timeseries.hasData()) {
    return null;
  }

  const { minDate } = timeseries;
  const rectWidth =
    barWidth ?? Math.floor(xScale(nextDay(minDate)) - xScale(minDate));

  const [, maxHeight] = yScale.range();

  return (
    <Group left={-0.5 * rectWidth}>
      {timeseries.points.map((p, i) => {
        const barHeight = yScale(p.value);
        return (
          <rect
            key={`bar-${i}`}
            x={xScale(p.date)}
            y={maxHeight - barHeight}
            width={rectWidth}
            height={barHeight}
            fill="#000"
            {...rectProps}
          />
        );
      })}
    </Group>
  );
};

export default BarChart;

// Given a date, it returns the date of the next day
function nextDay(date: Date): Date {
  const unixTimeMilliseconds = date.getTime();
  return new Date(unixTimeMilliseconds + 1000 * 24 * 60 * 60);
}
