import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { states } from "../../../regions";
import { MetricId } from "../../stories/mockMetricCatalog";
import { MetricLineChart } from "./MetricLineChart";

const [width, height] = [600, 400];
const newYork = states.findByRegionIdStrict("36");

export default {
  title: "Components/MetricLineChart",
  component: MetricLineChart,
} as ComponentMeta<typeof MetricLineChart>;

const Template: ComponentStory<typeof MetricLineChart> = (args) => (
  <MetricLineChart {...args} />
);

export const Example = Template.bind({});
Example.args = {
  width,
  height,
  metric: MetricId.APPLE_STOCK,
  region: newYork,
};

export const LoadingDelay = Template.bind({});
LoadingDelay.args = {
  ...Example.args,
  metric: MetricId.MOCK_CASES_DELAY_1S,
};

export const LoadingError = Template.bind({});
LoadingError.args = {
  ...Example.args,
  metric: MetricId.MOCK_CASES_ERROR,
};
