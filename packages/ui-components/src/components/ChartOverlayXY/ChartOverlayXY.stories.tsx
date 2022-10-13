import React, { useState } from "react";
import isNumber from "lodash/isNumber";
import { ComponentMeta } from "@storybook/react";
import { Group } from "@visx/group";
import { scaleUtc, scaleLinear } from "@visx/scale";
import { Timeseries } from "@actnowcoalition/metrics";
import { AxisBottom, AxisLeft } from "../Axis";
import { LineChart } from "../LineChart";
import { ChartOverlayXY, PointInfo } from ".";

export default {
  title: "Charts/ChartOverlayXY",
  component: ChartOverlayXY,
} as ComponentMeta<typeof ChartOverlayXY>;

const width = 600;
const height = 400;
const padding = 40;
const innerWidth = width - 2 * padding;
const innerHeight = height - 2 * padding;

const dates = [
  new Date("2022-01-01"),
  new Date("2022-01-02"),
  new Date("2022-01-03"),
  new Date("2022-01-04"),
  new Date("2022-01-05"),
  new Date("2022-01-06"),
  new Date("2022-01-07"),
  new Date("2022-01-08"),
  new Date("2022-01-09"),
];

function generateSeries(dates: Date[], maxValue: number): Timeseries<number> {
  const points = dates.map((date) => ({
    date,
    value: maxValue * Math.random(),
  }));
  return new Timeseries<number>(points);
}

const xScale = scaleUtc({
  domain: [dates[0], dates[dates.length - 1]],
  range: [0, innerWidth],
});

const yScale = scaleLinear({
  domain: [0, 30],
  range: [innerHeight, 0],
});

const seriesList = [
  { timeseries: generateSeries(dates, 10), color: "#2196f3" },
  { timeseries: generateSeries(dates, 20), color: "#66bb6a" },
  { timeseries: generateSeries(dates, 30), color: "#fb8c00" },
];

/**
 * This chart is a demo of a simplified Trends chart. When the user hovers
 * near a point on one of the series, the entire line is highlighted.
 *
 * When the user hovers near a point, the `ChartOverlayXY` component calls the
 * onMouseMove handler passing the index of the point in the series, and
 * the index of the series. We use that information to make the line thicker.
 */
export const ExampleTrendsChart = () => {
  const [pointIndex, setPointIndex] = useState<number | null>(null);
  const [timeseriesIndex, setTimeseriesIndex] = useState<number | null>(null);

  const isHoveringPoint = isNumber(pointIndex) && isNumber(timeseriesIndex);

  const onMouseMove = ({ pointIndex, timeseriesIndex }: PointInfo) => {
    if (isNumber(pointIndex) && isNumber(timeseriesIndex)) {
      setPointIndex(pointIndex);
      setTimeseriesIndex(timeseriesIndex);
    }
  };

  const onMouseOut = () => {
    setPointIndex(null);
    setTimeseriesIndex(null);
  };

  return (
    <svg width={width} height={height} style={{ border: "solid 1px #ddd" }}>
      <Group left={padding} top={padding}>
        <AxisBottom top={innerHeight} scale={xScale} />
        <AxisLeft scale={yScale} />
        {seriesList.map(({ timeseries, color }, tIndex) => (
          <Group key={`group-${tIndex}`}>
            <LineChart
              timeseries={timeseries}
              xScale={xScale}
              yScale={yScale}
              stroke={color}
              strokeWidth={
                isHoveringPoint && tIndex === timeseriesIndex ? 3 : 1
              }
            />
            <Group>
              {timeseries.points.map((p, pIndex) => (
                <circle
                  key={`point-${pIndex}`}
                  r={3}
                  cx={xScale(p.date)}
                  cy={yScale(p.value)}
                  fill={color}
                />
              ))}
            </Group>
          </Group>
        ))}
        <ChartOverlayXY
          timeseriesList={seriesList.map((s) => s.timeseries)}
          yScale={yScale}
          xScale={xScale}
          width={innerWidth}
          height={innerHeight}
          onMouseMove={onMouseMove}
          onMouseOut={onMouseOut}
        />
      </Group>
    </svg>
  );
};