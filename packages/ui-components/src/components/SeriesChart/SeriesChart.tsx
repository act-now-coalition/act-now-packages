import { Timeseries } from "@actnowcoalition/metrics";
import { Metric } from "@actnowcoalition/metrics";
import { Region } from "@actnowcoalition/regions";
import { ScaleLinear, ScaleTime } from "d3-scale";
import React from "react";

import { BarChart } from "../BarChart";
import { LineChart } from "../LineChart";

export enum SeriesType {
  LINE = "LINE",
  BAR = "BAR",
}

export interface SeriesBase {
  metric: Metric | string;
  region: Region;
}

export interface SeriesLine extends SeriesBase {
  /* The SeriesLine object is represented as a line chart */
  type: SeriesType.LINE;
  /* Adds ability to customize the line */
  lineProps?: Pick<
    React.SVGProps<SVGPathElement>,
    "stroke" | "strokeDasharray" | "strokeWidth"
  >;
}

export interface SeriesBar extends SeriesBase {
  /* The SeriesBar object is represented as a bar chart */
  type: SeriesType.BAR;
}

export type Series = SeriesLine | SeriesBar;

export interface SeriesChartProps {
  /** Series to render */
  series: Series;
  /** Timeseries corresponding to the series */
  timeseries: Timeseries<number>;
  /** d3-scale to transform point dates to pixel positions on the x-axis */
  xScale: ScaleTime<number, number>;
  /** d3-scale to transform point values to pixel positions on the y-axis */
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
