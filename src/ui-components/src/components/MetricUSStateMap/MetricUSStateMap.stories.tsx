import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Region, RegionDB, counties, states } from "@actnowcoalition/regions";

import { MetricId } from "../../stories/mockMetricCatalog";
import { MetricUSStateMap } from "./MetricUSStateMap";

const regionDB = new RegionDB([...states.all, ...counties.all], {
  getRegionUrl: (region: Region) => `/us/${region.slug}`,
});
const herkimerCountyNewYorkRegion = counties.findByRegionIdStrict("36043");

export default {
  title: "Components/MetricUSStateMap",
  component: MetricUSStateMap,
} as ComponentMeta<typeof MetricUSStateMap>;

const Template: ComponentStory<typeof MetricUSStateMap> = (args) => (
  <MetricUSStateMap {...args} />
);

export const NewYork = Template.bind({});
NewYork.args = {
  stateRegionId: "36",
  metric: MetricId.MOCK_CASES,
  regionDB,
};

export const Alaska = Template.bind({});
Alaska.args = {
  stateRegionId: "02",
  metric: MetricId.MOCK_CASES,
  regionDB,
};

export const NewYorkWithHighlightedCounty = Template.bind({});
NewYorkWithHighlightedCounty.args = {
  stateRegionId: "36",
  highlightedRegion: herkimerCountyNewYorkRegion,
  metric: MetricId.MOCK_CASES,
  regionDB,
};

export const LoadingDelay = Template.bind({});
LoadingDelay.args = {
  ...NewYork.args,
  metric: MetricId.MOCK_CASES_DELAY_1S,
};

export const LoadingError = Template.bind({});
LoadingError.args = {
  ...NewYork.args,
  metric: MetricId.MOCK_CASES_ERROR,
};
