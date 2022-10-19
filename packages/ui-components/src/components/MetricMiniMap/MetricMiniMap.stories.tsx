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

export const Example = Template.bind({});
Example.args = {
  stateRegionId: "36",
  metric: MetricId.MOCK_CASES,
  regionDB,
  renderTooltip,
};
