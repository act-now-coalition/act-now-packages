import React from "react";
import { Typography, Paper } from "@mui/material";
import { ComponentMeta } from "@storybook/react";
import { MetricId } from "../../stories/mockMetricCatalog";
import {
  MetricLegendThreshold,
  MetricLegendThresholdProps,
} from "./MetricLegendThreshold";
import { Story } from "@storybook/react";

export default {
  title: "Metrics/MetricLegendThreshold",
  component: MetricLegendThreshold,
} as ComponentMeta<typeof MetricLegendThreshold>;

const Template: Story<MetricLegendThresholdProps> = (args) => (
  <Paper sx={{ width: 500, padding: 2 }}>
    <MetricLegendThreshold {...args} />
  </Paper>
);

// Horizontal legend threshold props
const horizontalHeight = 40;
const horizontalBarHeight = 20;
const horizontalWidth = 300;

export const HorizontalDefault = Template.bind({});
HorizontalDefault.args = {
  orientation: "horizontal",
  supportingText: "A description of the metric",
  height: horizontalHeight,
  width: horizontalWidth,
  barHeight: horizontalBarHeight,
  showLabels: true,
  metric: MetricId.MOCK_CASES,
};

export const HorizontalWithoutLabels = Template.bind({});
HorizontalWithoutLabels.args = {
  ...HorizontalDefault.args,
  height: horizontalBarHeight,
  showLabels: false,
};

export const HorizontalOnlySideLabels = Template.bind({});
HorizontalOnlySideLabels.args = {
  ...HorizontalDefault.args,
  height: horizontalBarHeight,
  showLabels: false,
  startLabel: <Typography>lower</Typography>,
  endLabel: <Typography>higher</Typography>,
};

export const HorizontalRounded = Template.bind({});
HorizontalRounded.args = {
  ...HorizontalDefault.args,
  height: horizontalBarHeight,
  borderRadius: horizontalBarHeight / 2,
  showLabels: false,
};

export const HorizontalSquared = Template.bind({});
HorizontalSquared.args = {
  ...HorizontalDefault.args,
  borderRadius: 0,
  showLabels: true,
};

export const VerticalDefault = Template.bind({});
VerticalDefault.args = {
  orientation: "vertical",
  supportingText: "A description of the metric",
  metric: MetricId.MOCK_CASES,
};

export const VerticalRounded = Template.bind({});
VerticalRounded.args = {
  borderRadius: 8,
  ...VerticalDefault.args,
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
