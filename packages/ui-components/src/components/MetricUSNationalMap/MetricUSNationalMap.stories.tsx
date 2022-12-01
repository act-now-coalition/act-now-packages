import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Region, RegionDB, counties, states } from "@actnowcoalition/regions";

import { MetricId } from "../../stories/mockMetricCatalog";
import { MetricUSNationalMap } from "./MetricUSNationalMap";

export default {
  title: "Components/US National Map",
  component: MetricUSNationalMap,
} as ComponentMeta<typeof MetricUSNationalMap>;

const regionDB = new RegionDB([...states.all, ...counties.all], {
  getRegionUrl: (region: Region) => `/us/${region.slug}`,
});

const Template: ComponentStory<typeof MetricUSNationalMap> = (args) => (
  <MetricUSNationalMap {...args} />
);

const renderTooltip = (regionId: string) => {
  return regionDB.findByRegionIdStrict(regionId).fullName;
};

/** States colored by mock metric data */
export const MetricAwareStates = Template.bind({});
MetricAwareStates.args = {
  renderTooltip,
  metric: MetricId.MOCK_CASES,
  regionDB,
};

/** Counties colored by mock metric data */
export const MetricAwareCounties = Template.bind({});
MetricAwareCounties.args = {
  renderTooltip,
  metric: MetricId.MOCK_CASES,
  showCounties: true,
  regionDB,
};

export const LoadingDelay = Template.bind({});
LoadingDelay.args = {
  ...MetricAwareStates.args,
  metric: MetricId.MOCK_CASES_DELAY_1S,
};

export const LoadingError = Template.bind({});
LoadingError.args = {
  ...MetricAwareStates.args,
  metric: MetricId.MOCK_CASES_ERROR,
};
