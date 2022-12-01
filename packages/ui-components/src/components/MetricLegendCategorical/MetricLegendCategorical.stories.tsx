import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { MetricId } from "../../stories/mockMetricCatalog";
import { MetricLegendCategorical } from "./MetricLegendCategorical";

export default {
  title: "Components/MetricLegendCategorical",
  component: MetricLegendCategorical,
} as ComponentMeta<typeof MetricLegendCategorical>;

const Template: ComponentStory<typeof MetricLegendCategorical> = (args) => (
  <div style={{ width: 200, border: "1px solid #ddd" }}>
    <MetricLegendCategorical {...args} />
  </div>
);

export const HorizontalWithExtendedName = Template.bind({});
HorizontalWithExtendedName.args = {
  metric: MetricId.PASS_FAIL,
  orientation: "horizontal",
};

export const VerticalWithExtendedName = Template.bind({});
VerticalWithExtendedName.args = {
  metric: MetricId.PASS_FAIL,
  orientation: "vertical",
};

export const HorizontalWithoutExtendedName = Template.bind({});
HorizontalWithoutExtendedName.args = {
  metric: MetricId.PASS_FAIL_NO_EXTENDED_NAME,
  orientation: "horizontal",
};

export const VerticalWithoutExtendedName = Template.bind({});
VerticalWithoutExtendedName.args = {
  metric: MetricId.PASS_FAIL_NO_EXTENDED_NAME,
  orientation: "vertical",
};
