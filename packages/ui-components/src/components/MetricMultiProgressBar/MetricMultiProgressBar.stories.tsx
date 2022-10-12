import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { MetricMultiProgressBar } from ".";
import { states } from "@actnowcoalition/regions";
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
