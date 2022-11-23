import { assert } from "@actnowcoalition/assert";
import { Region, RegionDB, counties, states } from "@actnowcoalition/regions";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { USStateMap } from "./USStateMap";

const regionDB = new RegionDB([...states.all, ...counties.all], {
  getRegionUrl: (region: Region) => `/us/${region.slug}`,
});

const herkimerCountyNewYorkRegion = counties.findByRegionIdStrict("36043");

export default {
  title: "Maps/US State Map",
  component: USStateMap,
} as ComponentMeta<typeof USStateMap>;

const Template: ComponentStory<typeof USStateMap> = (args) => (
  <USStateMap {...args} />
);

const renderTooltip = (regionId: string) => {
  return regionDB.findByRegionIdStrict(regionId).fullName;
};

const getRegionUrl = (regionId: string): string => {
  const region = regionDB.findByRegionIdStrict(regionId);
  const url = regionDB.getRegionUrl(region);
  assert(typeof url === "string", "RegionDB.getRegionUrl must be configured");
  return url;
};

export const NewYorkWithoutBorderingStates = Template.bind({});
NewYorkWithoutBorderingStates.args = {
  stateRegionId: "36",
  renderTooltip,
  getRegionUrl,
  showBorderingStates: false,
  showCounties: false,
};

export const NewYorkWithBorderingStates = Template.bind({});
NewYorkWithBorderingStates.args = {
  stateRegionId: "36",
  renderTooltip,
  getRegionUrl,
  showCounties: false,
};

export const NewYorkCountiesWithoutBorderingStates = Template.bind({});
NewYorkCountiesWithoutBorderingStates.args = {
  stateRegionId: "36",
  renderTooltip,
  getRegionUrl,
  showBorderingStates: false,
};

export const NewYorkCountiesWithBorderingStates = Template.bind({});
NewYorkCountiesWithBorderingStates.args = {
  stateRegionId: "36",
  renderTooltip,
  getRegionUrl,
};

export const NewYorkCountiesWithHighlightedCounty = Template.bind({});
NewYorkCountiesWithHighlightedCounty.args = {
  stateRegionId: "36",
  highlightedRegion: herkimerCountyNewYorkRegion,
  renderTooltip,
  getRegionUrl,
};
