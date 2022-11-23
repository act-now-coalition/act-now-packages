import { ComponentMeta, ComponentStory } from "@storybook/react";

import React from "react";
import { TimeseriesLineChart } from "./TimeseriesLineChart";
import { appleStockTimeseries } from "../../stories/mockData";
import { assert } from "@actnowcoalition/assert";

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
