import React from "react";
import { Story, ComponentMeta } from "@storybook/react";
import { nations, Region, RegionDB } from "@actnowcoalition/regions";
import { MetricId } from "../../stories/mockMetricCatalog";
import { MetricWorldMap } from "./MetricWorldMap";
import { MetricWorldMapProps } from "./interfaces";

export default {
  title: "Maps/World Map",
  component: MetricWorldMap,
} as ComponentMeta<typeof MetricWorldMap>;

const regionDB = new RegionDB([...nations.all], {
  getRegionUrl: (region: Region) => `/${region.slug}`,
});

const Template: Story<MetricWorldMapProps> = (args) => (
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
