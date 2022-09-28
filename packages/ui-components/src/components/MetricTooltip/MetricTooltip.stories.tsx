import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { states } from "@actnowcoalition/regions";
import { metricCatalog, MetricId } from "../../stories/mockMetricCatalog";
import { MetricTooltip, MetricTooltipContent } from ".";

export default {
  title: "Components/MetricTooltip",
  component: MetricTooltip,
} as ComponentMeta<typeof MetricTooltip>;

const date = new Date("2022-03-15");
const value = 12.54;
const metric = metricCatalog.getMetric(MetricId.MOCK_CASES);
const region = states.findByRegionIdStrict("53");

const Template: ComponentStory<typeof MetricTooltip> = (args) => (
  <svg width={600} height={400} style={{ border: "solid 1px #ddd" }}>
    <MetricTooltip {...args}>
      <circle cx={300} cy={200} r={30} />
    </MetricTooltip>
  </svg>
);

export const Example = Template.bind({});
Example.args = {
  region,
  metric,
  date,
  value,
  placement: "top",
};

export const Content = () => (
  <MetricTooltipContent
    region={region}
    metric={metric}
    date={date}
    value={value}
  />
);
