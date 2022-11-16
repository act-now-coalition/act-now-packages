import React from "react";
import { Story, ComponentMeta } from "@storybook/react";
import { states, counties, Region, RegionDB } from "@actnowcoalition/regions";
import { MetricId } from "../../../stories/mockMetricCatalog";
import { MetricUSStateMap } from "./MetricUSStateMap";
import { MetricUSStateMapProps } from "../interfaces";

const regionDB = new RegionDB([...states.all, ...counties.all], {
  getRegionUrl: (region: Region) => `/us/${region.slug}`,
});
const herkimerCountyNewYorkRegion = counties.findByRegionIdStrict("36043");

export default {
  title: "Maps/US State Map",
  component: MetricUSStateMap,
} as ComponentMeta<typeof MetricUSStateMap>;

const Template: Story<MetricUSStateMapProps> = (args) => (
  <MetricUSStateMap {...args} />
);

const renderTooltip = (regionId: string) => {
  return regionDB.findByRegionIdStrict(regionId).fullName;
};

/** New York colored by mock metric data */
export const MetricAwareNewYork = Template.bind({});
MetricAwareNewYork.args = {
  stateRegionId: "36",
  renderTooltip,
  metric: MetricId.MOCK_CASES,
  regionDB,
};

export const MetricAwareAlaska = Template.bind({});
MetricAwareAlaska.args = {
  stateRegionId: "02",
  renderTooltip,
  metric: MetricId.MOCK_CASES,
  regionDB,
};

export const MetricAwareNewYorkWithHighlightedCounty = Template.bind({});
MetricAwareNewYorkWithHighlightedCounty.args = {
  stateRegionId: "36",
  highlightedRegion: herkimerCountyNewYorkRegion,
  renderTooltip,
  metric: MetricId.MOCK_CASES,
  regionDB,
};

export const LoadingDelay = Template.bind({});
LoadingDelay.args = {
  ...MetricAwareNewYork.args,
  metric: MetricId.MOCK_CASES_DELAY_1S,
};

export const LoadingError = Template.bind({});
LoadingError.args = {
  ...MetricAwareNewYork.args,
  metric: MetricId.MOCK_CASES_ERROR,
};
