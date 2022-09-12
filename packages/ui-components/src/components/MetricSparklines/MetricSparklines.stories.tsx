import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { MetricSparklines } from ".";
import { states } from "@actnowcoalition/regions";
import { MetricId } from "../../stories/mockMetricCatalog";

export default {
  title: "Metrics/MetricSparklines",
  component: MetricSparklines,
} as ComponentMeta<typeof MetricSparklines>;

const Template: ComponentStory<typeof MetricSparklines> = (args) => (
  <MetricSparklines {...args} />
);

const defaultArgs = {
  region: states.findByRegionIdStrict("12"),
  metricLineChart: MetricId.MOCK_CASES, // Make this a rolling avg. metric once provider is implemented.
  metricBarChart: MetricId.MOCK_CASES,
  numDays: 5,
};

export const ExampleFiveDays = Template.bind({});
ExampleFiveDays.args = {
  ...defaultArgs,
};

export const ExampleSixtyDays = Template.bind({});
ExampleSixtyDays.args = {
  ...defaultArgs,
  numDays: 60,
};
