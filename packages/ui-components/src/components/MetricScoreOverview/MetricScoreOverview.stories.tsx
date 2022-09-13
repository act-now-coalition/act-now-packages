import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { MetricScoreOverview } from ".";
import { states } from "@actnowcoalition/regions";
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
