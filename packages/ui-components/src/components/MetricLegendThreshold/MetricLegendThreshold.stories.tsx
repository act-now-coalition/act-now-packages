import React from "react";
import { ComponentMeta } from "@storybook/react";
import { MetricId } from "../../stories/mockMetricCatalog";
import MetricLegendThreshold, {
  MetricLegendThresholdProps,
} from "./MetricLegendThreshold";
import { Story } from "@storybook/react";

export default {
  title: "Components/MetricLegendCategorical",
  component: MetricLegendThreshold,
} as ComponentMeta<typeof MetricLegendThreshold>;

const Template: Story<MetricLegendThresholdProps> = (args) => (
  <div style={{ width: 200, border: "1px solid #ddd" }}>
    <MetricLegendThreshold {...args} />
  </div>
);

export const Horizontal = Template.bind({});
Horizontal.args = {
  metric: MetricId.MOCK_CASES,
  orientation: "horizontal",
};

export const Vertical = Template.bind({});
Vertical.args = {
  metric: MetricId.MOCK_CASES,
  orientation: "vertical",
};
