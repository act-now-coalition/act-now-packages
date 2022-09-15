import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { scaleLinear, scaleTime } from "@visx/scale";
import { assert } from "@actnowcoalition/assert";
import { appleStockTimeseries } from "../../stories/mockData";
import { LineChart } from ".";

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

assert(appleStockTimeseries.hasData(), `Timeseries cannot be empty`);

const { minDate, maxDate, minValue, maxValue } = appleStockTimeseries;

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
  timeseries: appleStockTimeseries,
  xScale,
  yScale,
  stroke: "#2a9d8f",
};

export const DottedLine = Template.bind({});
DottedLine.args = {
  timeseries: appleStockTimeseries,
  xScale,
  yScale,
  strokeWidth: 1,
  strokeDasharray: "2 2",
};
