import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Region, RegionDB, counties, states } from "src/regions";

import { MultiMetricUSStateMap } from ".";
import { MetricId } from "../../stories/mockMetricCatalog";

export default {
  title: "Components/MultiMetricUSStateMap",
  component: MultiMetricUSStateMap,
} as ComponentMeta<typeof MultiMetricUSStateMap>;

const regionDB = new RegionDB([...states.all, ...counties.all], {
  getRegionUrl: (region: Region) => `/us/${region.slug}`,
});

const Template: ComponentStory<typeof MultiMetricUSStateMap> = (args) => (
  <MultiMetricUSStateMap {...args} />
);

export const OneMetric = Template.bind({});
OneMetric.args = {
  stateRegionId: "36",
  metrics: [MetricId.MOCK_CASES],
  regionDB,
};

export const OneMetricWithHighlightedCounty = Template.bind({});
OneMetricWithHighlightedCounty.args = {
  stateRegionId: "36",
  highlightedRegion: counties.findByRegionIdStrict("36043"),
  metrics: [MetricId.MOCK_CASES],
  regionDB,
};

export const TwoMetrics = Template.bind({});
TwoMetrics.args = {
  stateRegionId: "36",
  metrics: [MetricId.MOCK_CASES, MetricId.PASS_FAIL],
  regionDB,
};

export const TwoMetricsWithHighlightedCounty = Template.bind({});
TwoMetricsWithHighlightedCounty.args = {
  stateRegionId: "36",
  highlightedRegion: counties.findByRegionIdStrict("36043"),
  metrics: [MetricId.MOCK_CASES, MetricId.PASS_FAIL],
  regionDB,
};

export const LoadingDelay = Template.bind({});
LoadingDelay.args = {
  ...OneMetric.args,
  metrics: [MetricId.MOCK_CASES_DELAY_1S],
};

export const LoadingError = Template.bind({});
LoadingError.args = {
  ...OneMetric.args,
  metrics: [MetricId.MOCK_CASES_ERROR],
};
