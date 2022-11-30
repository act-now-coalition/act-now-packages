import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Region, RegionDB, nations } from "@actnowcoalition/regions";

import { MetricId } from "../../stories/mockMetricCatalog";
import { MetricWorldMap } from "./MetricWorldMap";

export default {
  title: "Maps/World Map",
  component: MetricWorldMap,
} as ComponentMeta<typeof MetricWorldMap>;

const regionDB = new RegionDB([...nations.all], {
  getRegionUrl: (region: Region) => `/${region.slug}`,
});

const Template: ComponentStory<typeof MetricWorldMap> = (args) => (
  <MetricWorldMap {...args} />
);

const renderTooltip = (regionId: string) => {
  return regionDB.findByRegionId(regionId)?.fullName || "n/a";
};

/** Nations colored by mock metric data */
export const MetricAwareWorld = Template.bind({});
MetricAwareWorld.args = {
  renderTooltip,
  metric: MetricId.MOCK_CASES,
  regionDB,
};

export const LoadingDelay = Template.bind({});
LoadingDelay.args = {
  ...MetricAwareWorld.args,
  metric: MetricId.MOCK_CASES_DELAY_1S,
};

export const LoadingError = Template.bind({});
LoadingError.args = {
  ...MetricAwareWorld.args,
  metric: MetricId.MOCK_CASES_ERROR,
};
