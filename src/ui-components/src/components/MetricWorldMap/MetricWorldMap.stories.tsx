import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Region, RegionDB, nations } from "@actnowcoalition/regions";

import { MetricId } from "../../stories/mockMetricCatalog";
import { MetricWorldMap } from "./MetricWorldMap";

export default {
  title: "Components/MetricWorldMap",
  component: MetricWorldMap,
} as ComponentMeta<typeof MetricWorldMap>;

const regionDB = new RegionDB([...nations.all], {
  getRegionUrl: (region: Region) => `/${region.slug}`,
});

const Template: ComponentStory<typeof MetricWorldMap> = (args) => (
  <MetricWorldMap {...args} />
);

/** Nations colored by mock metric data */
export const World = Template.bind({});
World.args = {
  metric: MetricId.MOCK_CASES,
  regionDB,
};

export const LoadingDelay = Template.bind({});
LoadingDelay.args = {
  ...World.args,
  metric: MetricId.MOCK_CASES_DELAY_1S,
};

export const LoadingError = Template.bind({});
LoadingError.args = {
  ...World.args,
  metric: MetricId.MOCK_CASES_ERROR,
};
