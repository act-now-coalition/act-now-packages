import React from "react";
import { Story, ComponentMeta } from "@storybook/react";
import { states, counties, Region, RegionDB } from "@actnowcoalition/regions";
import { MetricId } from "../../../stories/mockMetricCatalog";
import { MetricUSNationalMap } from "./MetricUSNationalMap";
import { MetricUSNationalMapProps } from "./interfaces";

export default {
  title: "Maps/US National",
  component: MetricUSNationalMap,
} as ComponentMeta<typeof MetricUSNationalMap>;

const statesAndCounties = new RegionDB([...states.all, ...counties.all], {
  getRegionUrl: (region: Region) => `/us/${region.slug}`,
});

const Template: Story<MetricUSNationalMapProps> = (args) => (
  <MetricUSNationalMap {...args} />
);

const renderSimpleTooltip = (regionId: string) => {
  return statesAndCounties.findByRegionIdStrict(regionId).fullName;
};

/** States colored by mock metric data */
export const MetricAwareStates = Template.bind({});
MetricAwareStates.args = {
  renderTooltip: (regionId: string) => renderSimpleTooltip(regionId),
  metric: MetricId.MOCK_CASES,
  regionDB: statesAndCounties,
};

/** Counties colored by mock metric data */
export const MetricAwareCounties = Template.bind({});
MetricAwareCounties.args = {
  renderTooltip: (regionId: string) => renderSimpleTooltip(regionId),
  metric: MetricId.MOCK_CASES,
  showCounties: true,
  regionDB: statesAndCounties,
};
