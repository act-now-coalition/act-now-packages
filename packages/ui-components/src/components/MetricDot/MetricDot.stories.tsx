import { ComponentMeta, ComponentStory } from "@storybook/react";

import { MetricDot } from ".";
import { MetricId } from "../../stories/mockMetricCatalog";
import React from "react";
import { states } from "@actnowcoalition/regions";

export default {
  title: "Metrics/MetricDot",
  component: MetricDot,
} as ComponentMeta<typeof MetricDot>;

const Template: ComponentStory<typeof MetricDot> = (args) => (
  <MetricDot {...args} />
);

const washingtonState = states.findByRegionIdStrict("53");

export const MetricWithColors = Template.bind({});
MetricWithColors.args = {
  metric: MetricId.MOCK_CASES,
  region: washingtonState,
};

export const MetricWithoutColors = Template.bind({});
MetricWithoutColors.args = {
  metric: MetricId.PI,
  region: washingtonState,
};

export const LoadingDelay = Template.bind({});
LoadingDelay.args = {
  ...MetricWithColors.args,
  metric: MetricId.MOCK_CASES_DELAY_1S,
};

export const LoadingError = Template.bind({});
LoadingError.args = {
  ...MetricWithColors.args,
  metric: MetricId.MOCK_CASES_ERROR,
};
