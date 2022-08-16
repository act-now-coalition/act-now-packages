import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { scaleLinear, scaleTime } from "@visx/scale";
import { appleStock } from "@visx/mock-data";
import { assert } from "@actnowcoalition/assert";
import { Timeseries, TimeseriesPoint } from "@actnowcoalition/metrics";
import LineChart from ".";

export default {
  title: "Charts/LineChart",
  component: LineChart,
} as ComponentMeta<typeof LineChart>;

const [width, height] = [600, 400];
const padding = 20;

const Template: ComponentStory<typeof LineChart> = (args) => (
  <svg width={width} height={height} style={{ border: "solid 1px #eee" }}>
    <LineChart {...args} />
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

const timeseries = new Timeseries(points);
assert(timeseries.hasData(), `Timeseries cannot be empty`);

const { minDate, maxDate, minValue, maxValue } = timeseries;

const xScale = scaleTime({
  domain: [minDate, maxDate],
  range: [padding, width - padding],
});

const yScale = scaleLinear({
  domain: [minValue, maxValue],
  range: [height - 2 * padding, padding],
});

export const SolidLine = Template.bind({});
SolidLine.args = {
  timeseries,
  xScale,
  yScale,
  stroke: "#2a9d8f",
};

export const DottedLine = Template.bind({});
DottedLine.args = {
  timeseries,
  xScale,
  yScale,
  strokeWidth: 1,
  strokeDasharray: "2 2",
};
