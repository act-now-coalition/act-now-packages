import React from "react";
import { Story, ComponentMeta } from "@storybook/react";
import { TimeseriesChart } from "./TimeseriesChart";
import { TimeseriesChartProps } from "./interfaces";
import { assert } from "@actnowcoalition/assert";
import { appleStockTimeseries } from "../../stories/mockData";

const [width, height] = [600, 400];

assert(appleStockTimeseries.hasData(), `Timeseries cannot be empty`);

export default {
  title: "Charts/TimeseriesChart",
  component: TimeseriesChart,
} as ComponentMeta<typeof TimeseriesChart>;

const Template: Story<TimeseriesChartProps> = (args) => (
  <TimeseriesChart {...args} />
);

export const Example = Template.bind({});
Example.args = {
  width,
  height,
  timeseries: appleStockTimeseries,
};
