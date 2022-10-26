import React from "react";
import { Story, ComponentMeta } from "@storybook/react";
import { states, counties, Region, RegionDB } from "@actnowcoalition/regions";
import { MetricId } from "../../../stories/mockMetricCatalog";
import { MetricUSNationalMap } from "./MetricUSNationalMap";
import { MetricUSNationalMapProps } from "../interfaces";

export default {
  title: "Maps/US National Map",
  component: MetricUSNationalMap,
} as ComponentMeta<typeof MetricUSNationalMap>;

const regionDB = new RegionDB([...states.all, ...counties.all], {
  getRegionUrl: (region: Region) => `/us/${region.slug}`,
});

const Template: Story<MetricUSNationalMapProps> = (args) => (
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
