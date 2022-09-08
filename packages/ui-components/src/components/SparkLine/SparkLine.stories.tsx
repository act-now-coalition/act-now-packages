import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SparkLine } from ".";
import { appleStock } from "@visx/mock-data";
import { assert } from "@actnowcoalition/assert";
import { Timeseries, TimeseriesPoint } from "@actnowcoalition/metrics";

export default {
  title: "Charts/SparkLine",
  component: SparkLine,
} as ComponentMeta<typeof SparkLine>;

// We format the points from appleStock to match TimeseriesPoint<number>
// so we can use them to initialize Timeseries.
const points = appleStock.map(
  (p: { date: string; close: number }): TimeseriesPoint<number> => ({
    date: new Date(`${p.date.replace(/T.*/, "")}`),
    value: p.close,
  })
);

const timeseries = new Timeseries(points).filterToDateRange({
  startAt: new Date("2008-01-01"),
  endAt: new Date("2008-01-31"),
});
assert(timeseries.hasData(), `Timeseries cannot be empty`);

const Template: ComponentStory<typeof SparkLine> = (args) => (
  <SparkLine
    timeseriesBarChart={args.timeseriesBarChart}
    timeseriesLineChart={args.timeseriesLineChart}
    barWidth={args.barWidth}
  />
);

export const Example = Template.bind({});
Example.args = {
  timeseriesBarChart: timeseries,
  timeseriesLineChart: timeseries,
};