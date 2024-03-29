import React from "react";

import { Paper, Typography } from "@mui/material";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { states } from "../../../regions";
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

const TemplateWithCurrentCategoryInner = () => {
  const currentCategory = useData(
    newYork,
    MetricId.MOCK_CASES
  ).data?.getCategory();
  return (
    <Paper sx={{ p: 2 }}>
      <MetricLegendThreshold
        orientation="horizontal"
        metric={MetricId.MOCK_CASES}
        currentCategory={currentCategory}
      />
    </Paper>
  );
};

const TemplateWithCurrentCategory: ComponentStory<
  typeof MetricLegendThreshold
> = () => <TemplateWithCurrentCategoryInner />;

// Horizontal legend threshold props
const horizontalBarHeight = 20;

export const HorizontalDefault = Template.bind({});
HorizontalDefault.args = {
  orientation: "horizontal",
  height: horizontalBarHeight,
  metric: MetricId.MOCK_CASES,
};

export const HorizontalWithIndicator = TemplateWithCurrentCategory.bind({});
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

export const HorizontalWithLongSideLabels = Template.bind({});
HorizontalWithLongSideLabels.args = {
  ...HorizontalDefault.args,
  height: horizontalBarHeight,
  showLabels: false,
  startLabel: (
    <Typography variant="paragraphSmall">I am a long start label</Typography>
  ),
  endLabel: (
    <Typography variant="paragraphSmall">I am a long end label</Typography>
  ),
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
