import React from "react";

import { useTheme } from "@mui/material";
import { Group } from "@visx/group";
import { ScaleLinear, ScaleTime } from "d3-scale";

import { Timeseries } from "@actnowcoalition/metrics";

export interface BaseBarChartProps {
  /**
   * Timeseries used to draw the bar chart.
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
   * Width of each bar.
   * @default 2
   */
  barWidth?: number;
}

export type BarChartProps = BaseBarChartProps & React.SVGProps<SVGRectElement>;

/**
 * BarChart is a chart to represent a timeseries as a series of bars, one bar
 * for each point in the series.
 *
 * Note that the left edge of each rectangle will be aligned with the date of
 * the data point, which can cause the last bar to be outside the charting
 * area. Make sure to adjust the chart paddings accordingly (see Storybook
 * for an example).
 */

export const BarChart = ({
  timeseries,
  xScale,
  yScale,
  barWidth = 2,
  ...rectProps
}: BarChartProps) => {
  const theme = useTheme();
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
            fill={theme.palette.chart.main}
            {...rectProps}
          />
        );
      })}
    </Group>
  );
};
