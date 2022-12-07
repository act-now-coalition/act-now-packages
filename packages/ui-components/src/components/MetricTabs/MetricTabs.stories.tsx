import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { nations } from "@actnowcoalition/regions";

import { MetricTabs } from ".";
import { MetricId } from "../../stories/mockMetricCatalog";

export default {
  title: "Components/MetricTabs",
  component: MetricTabs,
} as ComponentMeta<typeof MetricTabs>;

const Template: ComponentStory<typeof MetricTabs> = (args) => (
  <MetricTabs {...args} />
);

const metricList = [
  MetricId.APPLE_STOCK,
  MetricId.NYC_TEMPERATURE,
  MetricId.APPLE_STOCK_LOW_THRESHOLDS,
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
