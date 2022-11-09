import React from "react";
import { Story, ComponentMeta } from "@storybook/react";
import { states } from "@actnowcoalition/regions";
import { MetricId } from "../../stories/mockMetricCatalog";
import {
  MetricLineThresholdChart,
  MetricLineThresholdChartProps,
} from "./MetricLineThresholdChart";

const [width, height] = [600, 400];
const newYork = states.findByRegionIdStrict("36");

export default {
  title: "Charts/MetricLineThresholdChart",
  component: MetricLineThresholdChart,
} as ComponentMeta<typeof MetricLineThresholdChart>;

const Template: Story<MetricLineThresholdChartProps> = (args) => (
  <MetricLineThresholdChart {...args} />
);

export const AppleStock = Template.bind({});
AppleStock.args = {
  width,
  height,
  metric: MetricId.APPLE_STOCK,
  region: newYork,
};

export const RandomPoints = Template.bind({});
RandomPoints.args = {
  width,
  height,
  metric: MetricId.RANDOM_POINTS,
  region: newYork,
};
