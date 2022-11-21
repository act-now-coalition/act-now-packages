import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TimeseriesPoint } from "@actnowcoalition/metrics";
import { states } from "@actnowcoalition/regions";
import { metricCatalog, MetricId } from "../../stories/mockMetricCatalog";
import { MetricTooltipContent } from ".";

export default {
  title: "Charts/MetricTooltipContent",
  component: MetricTooltipContent,
} as ComponentMeta<typeof MetricTooltipContent>;

const metric = metricCatalog.getMetric(MetricId.MOCK_CASES);
const region = states.findByRegionIdStrict("53");
const point: TimeseriesPoint<number> = {
  date: new Date("2022-03-15"),
  value: 12.54,
};

const Template: ComponentStory<typeof MetricTooltipContent> = (args) => (
  <MetricTooltipContent {...args} />
);

export const Example = Template.bind({});
Example.args = {
  region,
  metric,
  point,
};
