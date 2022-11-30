import { Group } from "@visx/group";
import { scaleLinear, scaleUtc } from "@visx/scale";
import React from "react";

import { NonEmptyTimeseries } from "@actnowcoalition/metrics";

import { BaseChartProps } from "../../common/utils/charts";
import { AxesTimeseries } from "../AxesTimeseries";
import { LineChart } from "../LineChart";

export interface TimeseriesLineChartProps extends BaseChartProps {
  timeseries: NonEmptyTimeseries<number>;
}

export const TimeseriesLineChart = ({
  width,
  height,
  timeseries,
  marginTop = 10,
  marginBottom = 30,
  marginLeft = 70,
  marginRight = 20,
}: TimeseriesLineChartProps) => {
  const chartHeight = height - marginTop - marginBottom;
  const chartWidth = width - marginLeft - marginRight;

  const { minDate, maxDate, maxValue } = timeseries;

  const xScale = scaleUtc({
    domain: [minDate, maxDate],
    range: [0, chartWidth],
  });

  const yScale = scaleLinear({
    domain: [0, maxValue],
    range: [chartHeight, 0],
  });

  return (
    <svg width={width} height={height}>
      <Group left={marginLeft} top={marginTop}>
        <AxesTimeseries height={chartHeight} xScale={xScale} yScale={yScale} />
        <LineChart timeseries={timeseries} xScale={xScale} yScale={yScale} />
      </Group>
    </svg>
  );
};
