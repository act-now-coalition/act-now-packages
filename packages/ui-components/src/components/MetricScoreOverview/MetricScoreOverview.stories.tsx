import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { states } from "@actnowcoalition/regions";

import { MetricScoreOverview } from ".";
import { MetricId } from "../../stories/mockMetricCatalog";

export default {
  title: "Metrics/MetricScoreOverview",
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

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export const ExtraStackProps = Template.bind({});
ExtraStackProps.args = {
  ...defaultArgs,
  direction: "row-reverse",
  sx: { maxWidth: 150 },
};

export const NoToolTip = Template.bind({});
NoToolTip.args = {
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
