import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { states } from "@actnowcoalition/regions";
import { MetricId } from "../../stories/mockMetricCatalog";
import { MetricDot } from ".";

export default {
  title: "Metrics/MetricDot",
  component: MetricDot,
} as ComponentMeta<typeof MetricDot>;

const Template: ComponentStory<typeof MetricDot> = (args) => (
  <MetricDot {...args} />
);

const washingtonState = states.findByRegionIdStrict("53");

export const MetricWithLevels = Template.bind({});
MetricWithLevels.args = {
  metric: MetricId.MOCK_CASES,
  region: washingtonState,
};

export const MetricWithoutLevels = Template.bind({});
MetricWithoutLevels.args = {
  metric: MetricId.PI,
  region: washingtonState,
};
