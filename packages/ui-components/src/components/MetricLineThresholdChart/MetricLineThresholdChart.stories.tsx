import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { states } from "@actnowcoalition/regions";
import { MetricId } from "../../stories/mockMetricCatalog";
import { MetricLineThresholdChart } from "./MetricLineThresholdChart";

const [width, height] = [600, 400];
const newYork = states.findByRegionIdStrict("36");

export default {
  title: "Charts/MetricLineThresholdChart",
  component: MetricLineThresholdChart,
} as ComponentMeta<typeof MetricLineThresholdChart>;

const Template: ComponentStory<typeof MetricLineThresholdChart> = (args) => (
  <MetricLineThresholdChart {...args} />
);

export const AppleStock = Template.bind({});
AppleStock.args = {
  width,
  height,
  metric: MetricId.APPLE_STOCK,
  region: newYork,
};

export const NewYorkCityTemperature = Template.bind({});
NewYorkCityTemperature.args = {
  ...AppleStock.args,
  metric: MetricId.NYC_TEMPERATURE,
};

export const YAxisStartsAtZero = Template.bind({});
YAxisStartsAtZero.args = {
  ...AppleStock.args,
  metric: MetricId.APPLE_STOCK_LOW_THRESHOLDS,
};

export const LoadingDelay = Template.bind({});
LoadingDelay.args = {
  ...AppleStock.args,
  metric: MetricId.MOCK_CASES_DELAY_1S,
};

export const LoadingError = Template.bind({});
LoadingError.args = {
  ...AppleStock.args,
  metric: MetricId.MOCK_CASES_ERROR,
};
