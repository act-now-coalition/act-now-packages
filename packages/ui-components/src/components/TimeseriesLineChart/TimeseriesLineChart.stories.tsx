import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TimeseriesLineChart } from "./TimeseriesLineChart";
import { assert } from "@actnowcoalition/assert";
import { appleStockTimeseries } from "../../stories/mockData";

const [width, height] = [600, 400];

assert(appleStockTimeseries.hasData(), `Timeseries cannot be empty`);

export default {
  title: "Charts/TimeseriesLineChart",
  component: TimeseriesLineChart,
} as ComponentMeta<typeof TimeseriesLineChart>;

const Template: ComponentStory<typeof TimeseriesLineChart> = (args) => (
  <TimeseriesLineChart {...args} />
);

export const AppleStockExample = Template.bind({});
AppleStockExample.args = {
  width,
  height,
  timeseries: appleStockTimeseries,
};
