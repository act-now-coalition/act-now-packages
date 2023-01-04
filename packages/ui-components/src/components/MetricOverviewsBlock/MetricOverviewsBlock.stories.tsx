import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { states } from "@actnowcoalition/regions";

import { MetricOverviewsBlock } from ".";
import { MetricId } from "../../stories/mockMetricCatalog";

export default {
  title: "Components/MetricOverviewsBlock",
  component: MetricOverviewsBlock,
} as ComponentMeta<typeof MetricOverviewsBlock>;

const Template: ComponentStory<typeof MetricOverviewsBlock> = (args) => (
  <MetricOverviewsBlock {...args} />
);

export const Example = Template.bind({});
Example.args = {
  region: states.findByRegionIdStrict("12"),
  metrics: [
    MetricId.APPLE_STOCK,
    MetricId.MOCK_CASES,
    MetricId.APPLE_STOCK,
    MetricId.MOCK_CASES,
    MetricId.APPLE_STOCK,
    MetricId.MOCK_CASES,
  ],
};
