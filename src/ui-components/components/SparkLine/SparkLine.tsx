import React from "react";

import { Group } from "@visx/group";
import { scaleLinear, scaleUtc } from "@visx/scale";

import { Timeseries } from "../../../metrics";
import { BarChart } from "../BarChart";
import { LineChart } from "../LineChart";

export interface BaseSparkLineProps {
  /**
   * Width of the sparkline component,
   * which includes both the line and the bars.
   * @default 150
   */
  width?: number;
  /**
   * Height of the sparkline component,
   * which includes both the line and the bars.
   * @default 50
   */
  height?: number;
  /**
   * Width of each bar of the sparkline's bar chart.
   * @default 2
   */
  barWidth?: number;
}

export interface SparkLineProps extends BaseSparkLineProps {
  /**
   * Timeseries used to draw the bar chart.
   */
  timeseriesBarChart: Timeseries<number>;
  /**
   * Timeseries used to draw the line chart.
   */
  timeseriesLineChart: Timeseries<number>;
  /**
   * Minimum value on the y-axis.
   * @default 0
   */
  minValue?: number;
  /**
   * Maximum value on the y-axis.
   */
  maxValue?: number;
}

export const SparkLine = ({
  timeseriesBarChart,
  timeseriesLineChart,
  width = 150,
  height = 50,
  barWidth = 2,
  minValue = 0,
  maxValue: propMaxValue,
}: SparkLineProps) => {
  const padding = 2;

  if (!timeseriesBarChart.hasData() || !timeseriesLineChart.hasData()) {
    return null;
  }

  const xScaleBar = scaleUtc({
    domain: [timeseriesBarChart.minDate, timeseriesBarChart.maxDate],
    range: [0, width - 2 * padding],
  });

  const yScaleBar = scaleLinear({
    domain: [minValue, propMaxValue ?? timeseriesBarChart.maxValue],
    range: [height - 2 * padding, 0],
  });

  const xScaleLine = scaleUtc({
    domain: [timeseriesLineChart.minDate, timeseriesLineChart.maxDate],
    range: [0, width - 2 * padding],
  });

  const yScaleLine = scaleLinear({
    domain: [minValue, propMaxValue ?? timeseriesLineChart.maxValue],
    range: [height - 2 * padding, 0],
  });

  return (
    <svg width={width} height={height} style={{ display: "block" }}>
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
