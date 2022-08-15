import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { scaleLinear, scaleBand } from "@visx/scale";
import { appleStock } from "@visx/mock-data";
import { assert } from "@actnowcoalition/assert";
import { Timeseries, TimeseriesPoint } from "@actnowcoalition/metrics";
import BarChart from ".";

export default {
  title: "Components/BarChart",
  component: BarChart,
} as ComponentMeta<typeof BarChart>;

const [width, height] = [600, 400];

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
  endAt: new Date("2008-06-30"),
});
assert(timeseries.hasData(), `Timeseries cannot be empty`);

const { minValue, maxValue } = timeseries;

const xScale = scaleBand({
  domain: timeseries.dates,
  range: [0, width],
  padding: 0.2,
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
};
