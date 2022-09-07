import React from "react";
import { Group } from "@visx/group";
import { Timeseries } from "@actnowcoalition/metrics";
import { LineChart } from "../LineChart";
import { scaleUtc, scaleLinear } from "@visx/scale";
import { useTheme } from "@mui/material";

export interface SparkLineOwnProps {
  /** Timeseries used to draw the bar chart */
  timeseriesBarChart: Timeseries<number>;

  /** Timeseries used to draw the line chart */
  timeseriesLineChart: Timeseries<number>;

  /** Width of the whole spark line component */
  width?: number;

  /** Height of the whole spark line component */
  height?: number;

  /** Width of each bar, in pixels (2px by default) */
  barWidth?: number;
}

export type SparkLineProps = SparkLineOwnProps & React.SVGProps<SVGRectElement>;

export const SparkLine: React.FC<SparkLineProps> = ({
  timeseriesBarChart,
  timeseriesLineChart,
  width = 150,
  height = 50,
  barWidth = 2,
  ...rectProps
}) => {
  const theme = useTheme();
  const padding = 2;

  if (!timeseriesBarChart.hasData() || !timeseriesLineChart.hasData()) {
    return null;
  }

  const xScaleBar = scaleUtc({
    domain: [timeseriesBarChart.minDate, timeseriesBarChart.maxDate],
    range: [0, width - padding],
  });

  const yScaleBar = scaleLinear({
    domain: [timeseriesBarChart.minValue, timeseriesBarChart.maxValue],
    range: [height - padding, 0],
  });

  const [yStart] = yScaleBar.range();

  const xScaleLine = scaleUtc({
    domain: [timeseriesLineChart.minDate, timeseriesLineChart.maxDate],
    range: [0, width - padding],
  });

  const yScaleLine = scaleLinear({
    domain: [timeseriesLineChart.minValue, timeseriesLineChart.maxValue],
    range: [height - padding, 0],
  });

  return (
    <svg width={width} height={height}>
      <Group left={-0.5 * barWidth}>
        {timeseriesBarChart.points.map((p, i) => {
          const rectY = yScaleBar(p.value);
          return (
            <rect
              key={`bar-${i}`}
              x={xScaleBar(p.date)}
              y={Math.min(rectY, yStart)}
              width={barWidth}
              height={Math.abs(rectY - yStart)}
              fill={theme.palette.border.default}
              {...rectProps}
            />
          );
        })}
      </Group>
      <LineChart
        timeseries={timeseriesLineChart}
        xScale={xScaleLine}
        yScale={yScaleLine}
      />
    </svg>
  );
};
