import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { MetricMiniMap } from ".";
import { MetricId } from "../../stories/mockMetricCatalog";
import { states, counties, Region, RegionDB } from "@actnowcoalition/regions";

export default {
  title: "Maps/MetricMiniMap",
  component: MetricMiniMap,
} as ComponentMeta<typeof MetricMiniMap>;

const regionDB = new RegionDB([...states.all, ...counties.all], {
  getRegionUrl: (region: Region) => `/us/${region.slug}`,
});

const renderTooltip = (regionId: string) => {
  return regionDB.findByRegionIdStrict(regionId).fullName;
};

const Template: ComponentStory<typeof MetricMiniMap> = (args) => (
  <MetricMiniMap {...args} />
);

export const OneMetric = Template.bind({});
OneMetric.args = {
  stateRegionId: "36",
  metrics: [MetricId.MOCK_CASES],
  regionDB,
  renderTooltip,
};

export const OneMetricWithHighlightedCounty = Template.bind({});
OneMetricWithHighlightedCounty.args = {
  stateRegionId: "36",
  currentRegion: counties.findByRegionIdStrict("36043"),
  metrics: [MetricId.MOCK_CASES],
  regionDB,
  renderTooltip,
};

export const TwoMetrics = Template.bind({});
TwoMetrics.args = {
  stateRegionId: "36",
  metrics: [MetricId.MOCK_CASES, MetricId.PASS_FAIL],
  regionDB,
  renderTooltip,
};

export const TwoMetricsWithHighlightedCounty = Template.bind({});
TwoMetricsWithHighlightedCounty.args = {
  stateRegionId: "36",
  currentRegion: counties.findByRegionIdStrict("36043"),
  metrics: [MetricId.MOCK_CASES, MetricId.PASS_FAIL],
  regionDB,
  renderTooltip,
};
