import React from "react";
import { Group } from "@visx/group";
import { Timeseries } from "@actnowcoalition/metrics";
import { BarChart } from "../BarChart";
import { LineChart } from "../LineChart";
import { scaleUtc, scaleLinear } from "@visx/scale";

export interface SparkLineProps {
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

export const SparkLine: React.FC<SparkLineProps> = ({
  timeseriesBarChart,
  timeseriesLineChart,
  width = 150,
  height = 50,
  barWidth = 2,
}) => {
  const padding = 2;

  if (!timeseriesBarChart.hasData() || !timeseriesLineChart.hasData()) {
    return null;
  }

  const xScaleBar = scaleUtc({
    domain: [timeseriesBarChart.minDate, timeseriesBarChart.maxDate],
    range: [0, width - 2 * padding],
  });

  const yScaleBar = scaleLinear({
    domain: [timeseriesBarChart.minValue, timeseriesBarChart.maxValue],
    range: [height - 2 * padding, 0],
  });

  const xScaleLine = scaleUtc({
    domain: [timeseriesLineChart.minDate, timeseriesLineChart.maxDate],
    range: [0, width - 2 * padding],
  });

  const yScaleLine = scaleLinear({
    domain: [timeseriesLineChart.minValue, timeseriesLineChart.maxValue],
    range: [height - 2 * padding, 0],
  });

  return (
    <svg width={width} height={height}>
      <Group left={padding} top={padding}>
        <Group left={-0.5 * barWidth}>
          <BarChart
            timeseries={timeseriesBarChart}
            xScale={xScaleBar}
            yScale={yScaleBar}
            fillOpacity={0.3}
          />
        </Group>
        <LineChart
          timeseries={timeseriesLineChart}
          xScale={xScaleLine}
          yScale={yScaleLine}
        />
      </Group>
    </svg>
  );
};
