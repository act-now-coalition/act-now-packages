import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { states } from "@actnowcoalition/regions";

import { MetricMultiProgressBar } from ".";
import { MetricId } from "../../stories/mockMetricCatalog";

export default {
  title: "Metrics/MetricMultiProgressBar",
  component: MetricMultiProgressBar,
} as ComponentMeta<typeof MetricMultiProgressBar>;

const Template: ComponentStory<typeof MetricMultiProgressBar> = (args) => (
  <MetricMultiProgressBar {...args} />
);

const newYorkRegion = states.findByRegionIdStrict("36");

export const Example = Template.bind({});
Example.args = {
  region: newYorkRegion,
  metrics: [MetricId.MOCK_CASES, MetricId.PASS_FAIL],
  maxValue: 500,
};

export const LoadingDelay = Template.bind({});
LoadingDelay.args = {
  ...Example.args,
  metrics: [MetricId.MOCK_CASES_DELAY_1S, MetricId.PASS_FAIL],
};

export const LoadingError = Template.bind({});
LoadingError.args = {
  ...Example.args,
  metrics: [MetricId.MOCK_CASES_ERROR, MetricId.PASS_FAIL],
};
