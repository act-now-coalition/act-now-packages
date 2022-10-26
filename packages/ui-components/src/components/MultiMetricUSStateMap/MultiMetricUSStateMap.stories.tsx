import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { MultiMetricUSStateMap } from ".";
import { MetricId } from "../../stories/mockMetricCatalog";
import { states, counties, Region, RegionDB } from "@actnowcoalition/regions";

export default {
  title: "Maps/MultiMetricUSStateMap",
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
