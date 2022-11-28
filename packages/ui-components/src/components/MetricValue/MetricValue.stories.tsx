import { ComponentMeta, ComponentStory } from "@storybook/react";

import { MetricId } from "../../stories/mockMetricCatalog";
import { MetricValue } from ".";
import React from "react";
import { states } from "@actnowcoalition/regions";

export default {
  title: "Metrics/MetricValue",
  component: MetricValue,
} as ComponentMeta<typeof MetricValue>;

const Template: ComponentStory<typeof MetricValue> = (args) => (
  <MetricValue {...args} />
);

const washingtonState = states.findByRegionIdStrict("53");

export const Default = Template.bind({});
Default.args = {
  region: washingtonState,
  metric: MetricId.MOCK_CASES,
};

export const DataTabularVariant = Template.bind({});
DataTabularVariant.args = { ...Default.args, variant: "dataTabular" };

export const LoadingDelay = Template.bind({});
LoadingDelay.args = {
  ...Default.args,
  metric: MetricId.MOCK_CASES_DELAY_1S,
};

export const LoadingError = Template.bind({});
LoadingError.args = {
  ...Default.args,
  metric: MetricId.MOCK_CASES_ERROR,
};
