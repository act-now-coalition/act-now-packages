import React from "react";
import { ScaleLinear, ScaleTime } from "d3-scale";
import { Group } from "@visx/group";
import { Timeseries } from "@actnowcoalition/metrics";
import { theme } from "../../styles";
import LineChart from "../LineChart";

export interface SparkLineOwnProps {
  /** Timeseries used to draw the bar chart */
  timeseries: Timeseries<number>;

  /** d3-scale to transform point dates to pixel positions on the x-axis */
  xScale: ScaleTime<number, number>;

  /** d3-scale to transform point values to pixel positions on the y-axis */
  yScale: ScaleLinear<number, number>;

  /** Width of each bar, in pixels (2px by default) */
  barWidth?: number;
}

export type SparkLineProps = SparkLineOwnProps & React.SVGProps<SVGRectElement>;

const SparkLine: React.FC<SparkLineProps> = ({
  timeseries,
  xScale,
  yScale,
  barWidth = 2,
  ...rectProps
}) => {
  const [yStart] = yScale.range();
  return (
    <Group>
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
              fill={theme.palette.border.default}
              {...rectProps}
            />
          );
        })}
      </Group>
      <LineChart
        timeseries={timeseries}
        xScale={xScale}
        yScale={yScale}
      ></LineChart>
    </Group>
  );
};

export default SparkLine;
