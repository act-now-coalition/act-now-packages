import React from "react";
import { TimeseriesChartProps } from "./interfaces";
import { LineChart } from "../LineChart";
import { AxesTimeseries } from "../Axes";
import { scaleLinear, scaleTime } from "@visx/scale";
import { Group } from "@visx/group";

export const TimeseriesChart: React.FC<TimeseriesChartProps> = ({
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

  const { minDate, maxValue } = timeseries;

  if (!minDate || !maxValue) {
    return null;
  }

  const dateScale = scaleTime({
    domain: [minDate, new Date()], // end at new Date()?
    range: [0, chartWidth],
  });

  const yScale = scaleLinear({
    domain: [0, maxValue], // start at zero?
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
