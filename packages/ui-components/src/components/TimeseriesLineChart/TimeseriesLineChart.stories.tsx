import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { assert } from "@actnowcoalition/assert";

import { appleStockTimeseries } from "../../stories/mockData";
import { TimeseriesLineChart } from "./TimeseriesLineChart";

const [width, height] = [600, 400];

assert(appleStockTimeseries.hasData(), `Timeseries cannot be empty`);

export default {
  title: "Components/TimeseriesLineChart",
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
