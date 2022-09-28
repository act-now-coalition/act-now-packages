import React from "react";
import { Story, ComponentMeta } from "@storybook/react";
import { MetricTimeseriesChart } from "./MetricTimeseriesChart";
import { MetricTimeseriesChartProps } from "./interfaces";
import { MetricId } from "../../stories/mockMetricCatalog";
import { states } from "@actnowcoalition/regions";

const [width, height] = [600, 400];
const newYork = states.findByRegionIdStrict("36");

export default {
  title: "Charts/MetricTimeseriesChart",
  component: MetricTimeseriesChart,
} as ComponentMeta<typeof MetricTimeseriesChart>;

const Template: Story<MetricTimeseriesChartProps> = (args) => (
  <MetricTimeseriesChart {...args} />
);

export const NewYorkMockCases = Template.bind({});
NewYorkMockCases.args = {
  width,
  height,
  metric: MetricId.MOCK_CASES,
  region: newYork,
};
