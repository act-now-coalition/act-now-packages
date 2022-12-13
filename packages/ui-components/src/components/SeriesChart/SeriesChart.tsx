import React from "react";

import { ScaleLinear, ScaleTime } from "d3-scale";

import { Timeseries } from "@actnowcoalition/metrics";
import { Metric } from "@actnowcoalition/metrics";
import { Region } from "@actnowcoalition/regions";

import { BarChart } from "../BarChart";
import { LineChart } from "../LineChart";

export enum SeriesType {
  LINE = "LINE",
  BAR = "BAR",
}

export interface SeriesBase {
  /**
   * Metric represented in the series.
   */
  metric: Metric | string;
  /**
   * Region represented in the series.
   */
  region: Region;
  /** Optional series label */
  label?: string;
}

export interface SeriesLine extends SeriesBase {
  /**
   * SeriesLine is represented as a line chart.
   */
  type: SeriesType.LINE;
  /**
   * Props allowing customization of the line's stroke, strokeDasharray, and strokeWidth.
   */
  lineProps?: Pick<
    React.SVGProps<SVGPathElement>,
    "stroke" | "strokeDasharray" | "strokeWidth"
  >;
}

export interface SeriesBar extends SeriesBase {
  /**
   * SeriesBar is represented as a bar chart.
   */
  type: SeriesType.BAR;
}

export type Series = SeriesLine | SeriesBar;

export interface SeriesChartProps {
  /**
   * Series represented by the chart.
   */
  series: Series;
  /**
   * Timeseries corresponding to the series.
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
}

export const SeriesChart = ({
  series,
  timeseries,
  xScale,
  yScale,
}: SeriesChartProps) => {
  switch (series.type) {
    case SeriesType.LINE:
      return (
        <LineChart
          timeseries={timeseries}
          xScale={xScale}
          yScale={yScale}
          {...series.lineProps}
        />
      );

    case SeriesType.BAR:
      return (
        <BarChart
          timeseries={timeseries}
          xScale={xScale}
          yScale={yScale}
          barWidth={0.5}
          fill="#ddd"
        />
      );
    default:
      return <></>;
  }
};
