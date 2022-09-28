import React from "react";
import { Story, ComponentMeta } from "@storybook/react";
import { MetricLineChart } from "./MetricLineChart";
import { MetricLineChartProps } from "./interfaces";
import { MetricId } from "../../stories/mockMetricCatalog";
import { states } from "@actnowcoalition/regions";

const [width, height] = [600, 400];
const newYork = states.findByRegionIdStrict("36");

export default {
  title: "Charts/MetricLineChart",
  component: MetricLineChart,
} as ComponentMeta<typeof MetricLineChart>;

const Template: Story<MetricLineChartProps> = (args) => (
  <MetricLineChart {...args} />
);

export const NewYorkMockCases = Template.bind({});
NewYorkMockCases.args = {
  width,
  height,
  metric: MetricId.MOCK_CASES,
  region: newYork,
};
