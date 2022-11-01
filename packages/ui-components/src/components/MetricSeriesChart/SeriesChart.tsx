import React from "react";
import { ScaleTime, ScaleLinear } from "d3-scale";
import { Timeseries } from "@actnowcoalition/metrics";
import { BarChart } from "../BarChart";
import { LineChart } from "../LineChart";
import { Series, SeriesType } from "./interfaces";

export interface SeriesChartProps {
  /** Series to render */
  series: Series;
  /** Timeseries corresponding to the series */
  timeseries: Timeseries<number>;
  /** d3-scale to transform point dates to pixel positions on the x-axis */
  dateScale: ScaleTime<number, number>;
  /** d3-scale to transform point values to pixel positions on the y-axis */
  yScale: ScaleLinear<number, number>;
}

export const SeriesChart = ({
  series,
  timeseries,
  dateScale,
  yScale,
}: SeriesChartProps) => {
  switch (series.type) {
    case SeriesType.LINE:
      return (
        <LineChart
          timeseries={timeseries}
          xScale={dateScale}
          yScale={yScale}
          {...series.lineProps}
        />
      );

    case SeriesType.BAR:
      return (
        <BarChart
          timeseries={timeseries}
          xScale={dateScale}
          yScale={yScale}
          barWidth={0.5}
          fill="#ddd"
        />
      );
    default:
      return <></>;
  }
};
