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

export const Example = Template.bind({});
Example.args = {
  region: nations.findByRegionIdStrict("USA"),
  metrics: [
    MetricId.APPLE_STOCK,
    MetricId.APPLE_STOCK_LOW_THRESHOLDS,
    MetricId.NYC_TEMPERATURE,
    MetricId.MOCK_CASES,
  ],
};
