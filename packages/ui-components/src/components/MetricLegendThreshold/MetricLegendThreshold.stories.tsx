import React from "react";

import { Paper, Typography } from "@mui/material";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { states } from "@actnowcoalition/regions";

import { useData } from "../../common/hooks";
import { MetricId } from "../../stories/mockMetricCatalog";
import { MetricLegendThreshold } from "./MetricLegendThreshold";

export default {
  title: "Components/MetricLegendThreshold",
  component: MetricLegendThreshold,
} as ComponentMeta<typeof MetricLegendThreshold>;

const Template: ComponentStory<typeof MetricLegendThreshold> = (args) => (
  <Paper sx={{ p: 2 }}>
    <MetricLegendThreshold {...args} />
  </Paper>
);

const newYork = states.findByRegionIdStrict("36");

const TemplateWithCurrentValueInner = () => {
  const currentValue = useData(newYork, MetricId.MOCK_CASES).data?.currentValue;
  return (
    <Paper sx={{ p: 2 }}>
      <MetricLegendThreshold
        orientation="horizontal"
        metric={MetricId.MOCK_CASES}
        currentValue={currentValue}
      />
    </Paper>
  );
};

const TemplateWithCurrentValue: ComponentStory<
  typeof MetricLegendThreshold
> = () => <TemplateWithCurrentValueInner />;

// Horizontal legend threshold props
const horizontalBarHeight = 20;

export const HorizontalDefault = Template.bind({});
HorizontalDefault.args = {
  orientation: "horizontal",
  height: horizontalBarHeight,
  metric: MetricId.MOCK_CASES,
};

export const HorizontalWithCurrentValue = TemplateWithCurrentValue.bind({});
HorizontalDefault.args = {
  orientation: "horizontal",
  height: horizontalBarHeight,
  metric: MetricId.MOCK_CASES,
};

export const HorizontalWithoutExtendedName = Template.bind({});
HorizontalWithoutExtendedName.args = {
  orientation: "horizontal",
  height: horizontalBarHeight,
  metric: MetricId.MOCK_CASES_NO_EXTENDED_NAME,
};

export const HorizontalWithoutLabels = Template.bind({});
HorizontalWithoutLabels.args = {
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

export const VerticalWithoutExtendedName = Template.bind({});
VerticalWithoutExtendedName.args = {
  orientation: "vertical",
  metric: MetricId.MOCK_CASES_NO_EXTENDED_NAME,
};

export const VerticalWithoutLabels = Template.bind({});
VerticalWithoutLabels.args = {
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

export const VerticalCategories = Template.bind({});
VerticalCategories.args = {
  orientation: "vertical",
  metric: MetricId.PASS_FAIL,
};

export const VerticalSmall = Template.bind({});
VerticalSmall.args = {
  height: 72,
  borderRadius: 8,
  showLabels: false,
  ...VerticalDefault.args,
};
