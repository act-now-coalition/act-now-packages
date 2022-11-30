import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { states } from "@actnowcoalition/regions";

import { MetricSparklines } from ".";
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
  // TODO: Make this a rolling avg. metric once provider is implemented.
  metricLineChart: MetricId.APPLE_STOCK,
  metricBarChart: MetricId.APPLE_STOCK,
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

export const LoadingDelay = Template.bind({});
LoadingDelay.args = {
  ...defaultArgs,
  metricLineChart: MetricId.MOCK_CASES_DELAY_1S,
  metricBarChart: MetricId.MOCK_CASES_DELAY_1S,
};

export const LoadingError = Template.bind({});
LoadingError.args = {
  ...defaultArgs,
  metricLineChart: MetricId.MOCK_CASES_ERROR,
  metricBarChart: MetricId.MOCK_CASES_ERROR,
};
