import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Region, RegionDB, counties, states } from "@actnowcoalition/regions";

import { MetricId } from "../../stories/mockMetricCatalog";
import { MetricUSNationalMap } from "./MetricUSNationalMap";

export default {
  title: "Components/MetricUSNationalMap",
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

export const States = Template.bind({});
States.args = {
  renderTooltip,
  metric: MetricId.MOCK_CASES,
  regionDB,
};

export const Counties = Template.bind({});
Counties.args = {
  renderTooltip,
  metric: MetricId.MOCK_CASES,
  showCounties: true,
  regionDB,
};

export const LoadingDelay = Template.bind({});
LoadingDelay.args = {
  ...States.args,
  metric: MetricId.MOCK_CASES_DELAY_1S,
};

export const LoadingError = Template.bind({});
LoadingError.args = {
  ...States.args,
  metric: MetricId.MOCK_CASES_ERROR,
};
