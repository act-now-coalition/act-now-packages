import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { states } from "src/regions";

import { MetricSeriesChart } from ".";
import { schemeCategory10 } from "../../common/utils/charts";
import { MetricId } from "../../stories/mockMetricCatalog";
import { theme } from "../../styles";
import { SeriesType } from "../SeriesChart";

export default {
  title: "Components/MetricSeriesChart",
  component: MetricSeriesChart,
} as ComponentMeta<typeof MetricSeriesChart>;

const width = 800;
const height = 600;

const WY = states.findByRegionIdStrict("56");
const WA = states.findByRegionIdStrict("56");
const NY = states.findByRegionIdStrict("36");
const IN = states.findByRegionIdStrict("18");

const Template: ComponentStory<typeof MetricSeriesChart> = (args) => (
  <MetricSeriesChart {...args} />
);

export const Vaccination = Template.bind({});
Vaccination.args = {
  width,
  height,
  series: [
    {
      region: WY,
      metric: MetricId.MOCK_CASES,
      type: SeriesType.LINE,
      lineProps: { stroke: theme.palette.gradient[100] },
    },
    {
      region: WA,
      metric: MetricId.MOCK_CASES,
      type: SeriesType.LINE,
      lineProps: { stroke: theme.palette.gradient[300] },
    },
  ],
};

export const TrendsSingleLocation = Template.bind({});
TrendsSingleLocation.args = {
  width,
  height,
  series: [
    {
      region: WA,
      metric: MetricId.MOCK_CASES,
      type: SeriesType.BAR,
    },
    {
      region: WA,
      metric: MetricId.MOCK_CASES,
      type: SeriesType.LINE,
      lineProps: { stroke: "black" },
    },
  ],
};

export const FilteredByDate = Template.bind({});
FilteredByDate.args = {
  width,
  height,
  dateRange: { startAt: new Date("2022-10-01"), endAt: new Date("2022-11-30") },
  series: [
    {
      region: WA,
      metric: MetricId.MOCK_CASES,
      type: SeriesType.BAR,
    },
    {
      region: WA,
      metric: MetricId.MOCK_CASES,
      type: SeriesType.LINE,
      lineProps: { stroke: "black" },
    },
  ],
};

export const TrendsMultipleLocations = Template.bind({});
TrendsMultipleLocations.args = {
  width,
  height,
  series: [
    {
      region: NY,
      metric: MetricId.MOCK_CASES,
      type: SeriesType.LINE,
      lineProps: { stroke: schemeCategory10[0] },
    },
    {
      region: WY,
      metric: MetricId.MOCK_CASES,
      type: SeriesType.LINE,
      lineProps: { stroke: schemeCategory10[1] },
    },
    {
      region: IN,
      metric: MetricId.MOCK_CASES,
      type: SeriesType.LINE,
      lineProps: { stroke: schemeCategory10[2], strokeDasharray: "4 4" },
    },
  ],
};

export const MultipleLocationsWithLabels = Template.bind({});
MultipleLocationsWithLabels.args = {
  width,
  height,
  marginRight: 100,
  series: [
    {
      region: NY,
      label: NY.shortName,
      metric: MetricId.MOCK_CASES,
      type: SeriesType.LINE,
      lineProps: { stroke: schemeCategory10[0] },
    },
    {
      region: WY,
      label: WY.shortName,
      metric: MetricId.MOCK_CASES,
      type: SeriesType.LINE,
      lineProps: { stroke: schemeCategory10[1] },
    },
    {
      region: IN,
      label: IN.shortName,
      metric: MetricId.MOCK_CASES,
      type: SeriesType.LINE,
      lineProps: { stroke: schemeCategory10[2], strokeDasharray: "4 4" },
    },
  ],
};

export const LoadingDelay = Template.bind({});
LoadingDelay.args = {
  width,
  height,
  series: [
    {
      region: NY,
      metric: MetricId.MOCK_CASES_DELAY_1S,
      type: SeriesType.LINE,
      lineProps: { stroke: schemeCategory10[0] },
    },
    {
      region: WY,
      metric: MetricId.MOCK_CASES,
      type: SeriesType.LINE,
      lineProps: { stroke: schemeCategory10[1] },
    },
  ],
};

export const LoadingError = Template.bind({});
LoadingError.args = {
  width,
  height,
  series: [
    {
      region: NY,
      metric: MetricId.MOCK_CASES_ERROR,
      type: SeriesType.LINE,
      lineProps: { stroke: schemeCategory10[0] },
    },
    {
      region: WY,
      metric: MetricId.MOCK_CASES,
      type: SeriesType.LINE,
      lineProps: { stroke: schemeCategory10[1] },
    },
  ],
};
