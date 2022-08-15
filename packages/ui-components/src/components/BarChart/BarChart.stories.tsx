import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { scaleLinear, scaleTime } from "@visx/scale";
import { appleStock } from "@visx/mock-data";

import { assert } from "@actnowcoalition/assert";
import { Timeseries, TimeseriesPoint } from "@actnowcoalition/metrics";

import BarChart from ".";
import LineChart from "../LineChart";

export default {
  title: "Charts/BarChart",
  component: BarChart,
} as ComponentMeta<typeof BarChart>;

const [width, height] = [600, 400];
const padding = 5;
const color = "#2a9d8f";

const Template: ComponentStory<typeof BarChart> = (args) => (
  <svg width={width} height={height} style={{ border: "solid 1px #eee" }}>
    <BarChart {...args} />
  </svg>
);

// We format the points from appleStock to match TimeseriesPoint<number>
// so we can use them to initialize Timeseries.
const points = appleStock.map(
  (p: { date: string; close: number }): TimeseriesPoint<number> => ({
    date: new Date(p.date.substring(0, 10)),
    value: p.close,
  })
);

const timeseries = new Timeseries(points).filterToDateRange({
  startAt: new Date("2008-01-01"),
  endAt: new Date("2008-03-31"),
});
assert(timeseries.hasData(), `Timeseries cannot be empty`);

const { minDate, maxDate, minValue, maxValue } = timeseries;

const xScale = scaleTime({
  domain: [minDate, maxDate],
  range: [padding, width - 2 * padding],
});

const yScale = scaleLinear({
  domain: [minValue, maxValue],
  range: [0, height],
});

export const Example = Template.bind({});
Example.args = {
  timeseries,
  xScale,
  yScale,
  fill: color,
};

const yScaleLine = scaleLinear({
  domain: yScale.domain(),
  range: [height, 0],
});

export const WithLineChart = () => (
  <svg width={width} height={height} style={{ border: "solid 1px #eee" }}>
    <BarChart
      timeseries={timeseries}
      xScale={xScale}
      yScale={yScale}
      fill={color}
      fillOpacity={0.3}
    />
    <LineChart timeseries={timeseries} xScale={xScale} yScale={yScaleLine} />
  </svg>
);
