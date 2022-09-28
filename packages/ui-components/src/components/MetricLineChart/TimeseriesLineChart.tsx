import React from "react";
import { TimeseriesLineChartProps } from "./interfaces";
import { LineChart } from "../LineChart";
import { AxesTimeseries } from "../Axes";
import { scaleLinear, scaleTime } from "@visx/scale";
import { Group } from "@visx/group";

export const TimeseriesLineChart: React.FC<TimeseriesLineChartProps> = ({
  width,
  height,
  timeseries,
  marginTop = 10,
  marginBottom = 30,
  marginLeft = 70,
  marginRight = 20,
}) => {
  const chartHeight = height - marginTop - marginBottom;
  const chartWidth = width - marginLeft - marginRight;

  const { minDate, maxDate, maxValue } = timeseries;

  const dateScale = scaleTime({
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
        <AxesTimeseries
          height={chartHeight}
          dateScale={dateScale}
          yScale={yScale}
        />
        <LineChart timeseries={timeseries} xScale={dateScale} yScale={yScale} />
      </Group>
    </svg>
  );
};
