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
    MetricId.MOCK_CASES,
    MetricId.MOCK_CASES_DELAY_1S,
  ],
};
