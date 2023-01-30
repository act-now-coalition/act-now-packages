import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { MetricValue } from ".";
import { states } from "../../../regions";
import { MetricId } from "../../stories/mockMetricCatalog";

export default {
  title: "Components/MetricValue",
  component: MetricValue,
} as ComponentMeta<typeof MetricValue>;

const Template: ComponentStory<typeof MetricValue> = (args) => (
  <MetricValue {...args} />
);

const washingtonState = states.findByRegionIdStrict("53");

export const Example = Template.bind({});
Example.args = {
  region: washingtonState,
  metric: MetricId.MOCK_CASES,
};

export const DataTabularVariant = Template.bind({});
DataTabularVariant.args = { ...Example.args, variant: "dataTabular" };

export const LoadingDelay = Template.bind({});
LoadingDelay.args = {
  ...Example.args,
  metric: MetricId.MOCK_CASES_DELAY_1S,
};

export const LoadingError = Template.bind({});
LoadingError.args = {
  ...Example.args,
  metric: MetricId.MOCK_CASES_ERROR,
};
