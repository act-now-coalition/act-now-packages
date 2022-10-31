import React from "react";
import { ScaleTime, ScaleLinear } from "d3-scale";
import { Timeseries } from "@actnowcoalition/metrics";

import { LineChart } from "../LineChart";
import { BarChart } from "../BarChart";
import { Series, SeriesType } from "./interfaces";

export interface SeriesChartProps {
  series: Series;
  timeseries: Timeseries<number>;
  dateScale: ScaleTime<number, number>;
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
