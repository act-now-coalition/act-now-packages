import React from "react";
import { ComponentMeta } from "@storybook/react";
import { MetricId } from "../../stories/mockMetricCatalog";
import MetricLegendCategorical, {
  MetricLegendCategoricalProps,
} from "./MetricLegendCategorical";
import { Story } from "@storybook/react";

export default {
  title: "Metrics/MetricLegendCategorical",
  component: MetricLegendCategorical,
} as ComponentMeta<typeof MetricLegendCategorical>;

const Template: Story<MetricLegendCategoricalProps> = (args) => (
  <div style={{ width: 200, border: "1px solid #ddd" }}>
    <MetricLegendCategorical {...args} />
  </div>
);

export const Horizontal = Template.bind({});
Horizontal.args = {
  metric: MetricId.PASS_FAIL,
  orientation: "horizontal",
};

export const Vertical = Template.bind({});
Vertical.args = {
  metric: MetricId.PASS_FAIL,
  orientation: "vertical",
};
