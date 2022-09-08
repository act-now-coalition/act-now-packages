import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { MetricScoreOverview } from ".";
import { states } from "@actnowcoalition/regions";
import { MetricId } from "../../stories/mockMetricCatalog";

export default {
  title: "Components/MetricScoreOverview",
  component: MetricScoreOverview,
} as ComponentMeta<typeof MetricScoreOverview>;

const Template: ComponentStory<typeof MetricScoreOverview> = (args) => (
  <MetricScoreOverview {...args} />
);

export const Example = Template.bind({});
Example.args = {
  region: states.findByRegionIdStrict("36"),
  metric: MetricId.MOCK_CASES,
  supportingText:
    "This is supporting text. There is a fair amount of it. Multiple lines, perhaps?",
  tooltipText:
    "This is a tooltip. It is very useful. It is very helpful. It is very informative.",
};
