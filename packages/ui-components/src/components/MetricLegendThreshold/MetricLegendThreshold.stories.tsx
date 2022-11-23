import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Paper, Typography } from "@mui/material";

import { MetricId } from "../../stories/mockMetricCatalog";
import { MetricLegendThreshold } from "./MetricLegendThreshold";
import React from "react";

export default {
  title: "Metrics/MetricLegendThreshold",
  component: MetricLegendThreshold,
} as ComponentMeta<typeof MetricLegendThreshold>;

const Template: ComponentStory<typeof MetricLegendThreshold> = (args) => (
  <Paper sx={{ p: 2 }}>
    <MetricLegendThreshold {...args} />
  </Paper>
);

// Horizontal legend threshold props
const horizontalBarHeight = 20;

export const HorizontalDefault = Template.bind({});
HorizontalDefault.args = {
  orientation: "horizontal",
  height: horizontalBarHeight,
  metric: MetricId.MOCK_CASES,
};

export const HorizontalNoExtendedName = Template.bind({});
HorizontalNoExtendedName.args = {
  orientation: "horizontal",
  height: horizontalBarHeight,
  metric: MetricId.MOCK_CASES_NO_EXTENDED_NAME,
};

export const HorizontalNoLabels = Template.bind({});
HorizontalNoLabels.args = {
  ...HorizontalDefault.args,
  showLabels: false,
};

export const HorizontalOnlySideLabels = Template.bind({});
HorizontalOnlySideLabels.args = {
  ...HorizontalDefault.args,
  height: horizontalBarHeight,
  showLabels: false,
  startLabel: <Typography variant="paragraphSmall">lower</Typography>,
  endLabel: <Typography variant="paragraphSmall">higher</Typography>,
};

export const HorizontalCategories = Template.bind({});
HorizontalCategories.args = {
  orientation: "horizontal",
  height: horizontalBarHeight,
  metric: MetricId.PASS_FAIL,
};

export const VerticalDefault = Template.bind({});
VerticalDefault.args = {
  orientation: "vertical",
  metric: MetricId.MOCK_CASES,
};

export const VerticalNoExtendedName = Template.bind({});
VerticalNoExtendedName.args = {
  orientation: "vertical",
  metric: MetricId.MOCK_CASES_NO_EXTENDED_NAME,
};

export const VerticalCategories = Template.bind({});
VerticalCategories.args = {
  orientation: "vertical",
  metric: MetricId.PASS_FAIL,
};

export const VerticalNoLabel = Template.bind({});
VerticalNoLabel.args = {
  showLabels: false,
  ...VerticalDefault.args,
};

export const VerticalOnlySideLabels = Template.bind({});
VerticalOnlySideLabels.args = {
  ...VerticalDefault.args,
  showLabels: false,
  startLabel: <Typography>lower</Typography>,
  endLabel: <Typography>higher</Typography>,
};

export const VerticalSmall = Template.bind({});
VerticalSmall.args = {
  height: 72,
  borderRadius: 8,
  showLabels: false,
  ...VerticalDefault.args,
};
