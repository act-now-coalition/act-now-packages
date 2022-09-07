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

  width?: number;

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

  const xScaleBar = scaleUtc({
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    domain: [timeseriesBarChart.minDate!, timeseriesBarChart.maxDate!],
    range: [0, width - 5],
  });

  const yScaleBar = scaleLinear({
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    domain: [timeseriesBarChart.minValue!, timeseriesBarChart.maxValue!],
    range: [height - 5, 0],
  });

  const [yStart] = yScaleBar.range();

  const xScaleLine = scaleUtc({
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    domain: [timeseriesLineChart.minDate!, timeseriesLineChart.maxDate!],
    range: [0, width - 5],
  });

  const yScaleLine = scaleLinear({
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    domain: [timeseriesLineChart.minValue!, timeseriesLineChart.maxValue!],
    range: [height - 5, 0],
  });

  return (
    <Group>
      <Group>
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
      ></LineChart>
    </Group>
  );
};
