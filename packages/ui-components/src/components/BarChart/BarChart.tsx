import React from "react";
import { ScaleLinear, ScaleTime } from "d3-scale";
import { Group } from "@visx/group";

import { Timeseries } from "@actnowcoalition/metrics";

export interface BarChartOwnProps {
  /** Timeseries used to draw the bar chart */
  timeseries: Timeseries<number>;

  /** d3-scale to transform point dates to pixel positions on the x-axis */
  xScale: ScaleTime<number, number>;

  /** d3-scale to transform point values to pixel positions on the y-axis */
  yScale: ScaleLinear<number, number>;

  /** Width of each bar, in pixels (2px by default) */
  barWidth?: number;
}

export type BarChartProps = BarChartOwnProps & React.SVGProps<SVGRectElement>;

/**
 * BarChart is a chart to represent a Timeseries as a series of bars, one bar
 * for each point in the series.
 *
 * Note that the left edge of each rectangle will be aligned with the date of
 * the data point, which can cause the last bar to be outside the charting
 * area. Make sure to adjust the chart paddings accordingly (see Storybook
 * for an example).
 *
 * @example
 * ```tsx
 * const xScale = scaleUtc({ domain: [minDate, maxDate], range: [0, width] });
 * const yScale = scaleLinear({ domain: [minValue, maxValue], range: [height, 0] });
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
  barWidth = 2,
  ...rectProps
}) => {
  const [yStart] = yScale.range();
  return (
    <Group>
      {timeseries.points.map((p, i) => {
        const rectY = yScale(p.value);
        return (
          <rect
            key={`bar-${i}`}
            x={xScale(p.date)}
            y={Math.min(rectY, yStart)}
            width={barWidth}
            height={Math.abs(rectY - yStart)}
            fill="#000"
            {...rectProps}
          />
        );
      })}
    </Group>
  );
};

export default BarChart;