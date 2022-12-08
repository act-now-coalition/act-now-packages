import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { nations } from "@actnowcoalition/regions";

import { MetricChartBlock } from ".";
import { MetricId } from "../../stories/mockMetricCatalog";

export default {
  title: "Components/MetricChartBlock",
  component: MetricChartBlock,
} as ComponentMeta<typeof MetricChartBlock>;

const Template: ComponentStory<typeof MetricChartBlock> = (args) => (
  <MetricChartBlock {...args} />
);

const metricList = [
  MetricId.APPLE_STOCK,
  MetricId.NYC_TEMPERATURE,
  MetricId.MOCK_CASES_NO_LEVELS,
];

export const Example = Template.bind({});
Example.args = {
  region: nations.findByRegionIdStrict("USA"),
  metrics: metricList,
};

export const SmallExample = Template.bind({});
SmallExample.args = {
  region: nations.findByRegionIdStrict("USA"),
  metrics: [...metricList, MetricId.MOCK_CASES_DELAY_1S],
  width: 320,
};
