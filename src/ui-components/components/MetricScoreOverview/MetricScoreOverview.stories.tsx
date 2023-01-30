import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { MetricScoreOverview } from ".";
import { states } from "../../../regions";
import { MetricId } from "../../stories/mockMetricCatalog";

export default {
  title: "Components/MetricScoreOverview",
  component: MetricScoreOverview,
} as ComponentMeta<typeof MetricScoreOverview>;

const Template: ComponentStory<typeof MetricScoreOverview> = (args) => (
  <MetricScoreOverview {...args} />
);

const defaultArgs = {
  region: states.findByRegionIdStrict("36"),
  metric: MetricId.MOCK_CASES,
  tooltipTitle:
    "This is a tooltip. It is very useful. It is very helpful. It is very informative.",
};

export const Example = Template.bind({});
Example.args = {
  ...defaultArgs,
};

export const WithoutTooltip = Template.bind({});
WithoutTooltip.args = {
  ...defaultArgs,
  tooltipTitle: undefined,
};

export const LoadingDelay = Template.bind({});
LoadingDelay.args = {
  ...defaultArgs,
  metric: MetricId.MOCK_CASES_DELAY_1S,
};

export const LoadingError = Template.bind({});
LoadingError.args = {
  ...defaultArgs,
  metric: MetricId.MOCK_CASES_ERROR,
};
