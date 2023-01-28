import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { TimeseriesPoint } from "@actnowcoalition/metrics";
import { states } from "@actnowcoalition/regions";

import { MetricChartTooltipContent } from ".";
import { MetricId, metricCatalog } from "../../stories/mockMetricCatalog";

export default {
  title: "Components/MetricChartTooltipContent",
  component: MetricChartTooltipContent,
} as ComponentMeta<typeof MetricChartTooltipContent>;

const metric = metricCatalog.getMetric(MetricId.MOCK_CASES);
const region = states.findByRegionIdStrict("53");
const point: TimeseriesPoint<number> = {
  date: new Date("2022-03-15"),
  value: 12.54,
};

const Template: ComponentStory<typeof MetricChartTooltipContent> = (args) => (
  <MetricChartTooltipContent {...args} />
);

export const Example = Template.bind({});
Example.args = {
  region,
  metric,
  point,
};
