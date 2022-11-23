import { ComponentMeta, ComponentStory } from "@storybook/react";

import { MetricId } from "../../stories/mockMetricCatalog";
import { MetricLegendCategorical } from "./MetricLegendCategorical";
import React from "react";

export default {
  title: "Metrics/MetricLegendCategorical",
  component: MetricLegendCategorical,
} as ComponentMeta<typeof MetricLegendCategorical>;

const Template: ComponentStory<typeof MetricLegendCategorical> = (args) => (
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

export const HorizontalNoExtendedName = Template.bind({});
HorizontalNoExtendedName.args = {
  metric: MetricId.PASS_FAIL_NO_EXTENDED_NAME,
  orientation: "horizontal",
};

export const VerticalNoExtendedName = Template.bind({});
VerticalNoExtendedName.args = {
  metric: MetricId.PASS_FAIL_NO_EXTENDED_NAME,
  orientation: "vertical",
};
