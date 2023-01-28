import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { states } from "src/regions";

import { MetricId } from "../../stories/mockMetricCatalog";
import { MetricLineThresholdChart } from "./MetricLineThresholdChart";

const [width, height] = [600, 400];
const newYork = states.findByRegionIdStrict("36");

export default {
  title: "Components/MetricLineThresholdChart",
  component: MetricLineThresholdChart,
} as ComponentMeta<typeof MetricLineThresholdChart>;

const Template: ComponentStory<typeof MetricLineThresholdChart> = (args) => (
  <MetricLineThresholdChart {...args} />
);

export const WithMinYZero = Template.bind({});
WithMinYZero.args = {
  width,
  height,
  metric: MetricId.APPLE_STOCK,
  region: newYork,
};

export const WithNegativeYValues = Template.bind({});
WithNegativeYValues.args = {
  ...WithMinYZero.args,
  metric: MetricId.NYC_TEMPERATURE,
};

export const LoadingDelay = Template.bind({});
LoadingDelay.args = {
  ...WithMinYZero.args,
  metric: MetricId.MOCK_CASES_DELAY_1S,
};

export const LoadingError = Template.bind({});
LoadingError.args = {
  ...WithMinYZero.args,
  metric: MetricId.MOCK_CASES_ERROR,
};
