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

export const NewYorkMockCases = Template.bind({});
NewYorkMockCases.args = {
  width,
  height,
  metric: MetricId.MOCK_CASES,
  region: newYork,
};
