import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import LineChart from ".";
import { Timeseries } from "@actnowcoalition/metrics";
import { scaleLinear, scaleTime } from "@visx/scale";
import { appleStock } from "@visx/mock-data";
import { TimeseriesPoint } from "packages/metrics/dist";
import { AppleStock } from "@visx/mock-data/lib/mocks/appleStock";

export default {
  title: "Charts/LineChart",
  component: LineChart,
} as ComponentMeta<typeof LineChart>;

const width = 300;
const height = 100;
const padding = 4;

const Template: ComponentStory<typeof LineChart> = (args) => (
  <svg width={width} height={height} style={{ border: "solid 1px #eee" }}>
    <LineChart {...args} />
  </svg>
);

const formatPoint = (p: AppleStock): TimeseriesPoint<number> => ({
  date: new Date(`${p.date.substring(0, 10)}T00:00:00Z`),
  value: p.close,
});

const timeseries = new Timeseries(appleStock.map(formatPoint));

const startDate = timeseries.hasData()
  ? timeseries.minDate
  : new Date("2007-04-24");
const endDate = timeseries.hasData()
  ? timeseries.maxDate
  : new Date("2007-04-30");

const minValue = timeseries.hasData() ? timeseries.minValue : 0;
const maxValue = timeseries.hasData() ? timeseries.maxValue : 10;

const xScale = scaleTime({
  domain: [startDate, endDate],
  range: [padding, width - padding],
});
const yScale = scaleLinear({
  domain: [minValue, maxValue],
  range: [height - 2 * padding, padding],
});

export const Example = Template.bind({});
Example.args = { timeseries, xScale, yScale, stroke: "blue" };
