import React from "react";

import { Tooltip, Typography } from "@mui/material";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { states } from "@actnowcoalition/regions";

import { MetricMapTooltipContent } from ".";
import { MetricId, metricCatalog } from "../../stories/mockMetricCatalog";

export default {
  title: "Components/MetricMapTooltipContent",
  component: MetricMapTooltipContent,
} as ComponentMeta<typeof MetricMapTooltipContent>;

const metric = metricCatalog.getMetric(MetricId.MOCK_CASES);
const region = states.findByRegionIdStrict("53");

const Template: ComponentStory<typeof MetricMapTooltipContent> = (args) => (
  <MetricMapTooltipContent {...args} />
);

export const Example = Template.bind({});
Example.args = {
  region,
  metric,
};

const ExampleInTooltipTemplate: ComponentStory<
  typeof MetricMapTooltipContent
> = (args) => (
  <Tooltip title={<MetricMapTooltipContent {...args} />}>
    <Typography variant="labelLarge">Hover me</Typography>
  </Tooltip>
);

export const ExampleInTooltip = ExampleInTooltipTemplate.bind({});
ExampleInTooltip.args = {
  region,
  metric,
};
