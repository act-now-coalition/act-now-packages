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
  // TODO: Make this a rolling avg. metric once provider is implemented.
  metricLineChart: MetricId.APPLE_STOCK,
  metricBarChart: MetricId.APPLE_STOCK,
};

export const ExampleFiveDays = Template.bind({});
ExampleFiveDays.args = {
  ...defaultArgs,
  dateFrom: new Date("2012-01-01"),
  dateTo: new Date("2012-01-05"),
};

export const ExampleSixtyDays = Template.bind({});
ExampleSixtyDays.args = {
  ...defaultArgs,
  dateFrom: new Date("2012-01-01"),
  dateTo: new Date("2012-03-02"),
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
