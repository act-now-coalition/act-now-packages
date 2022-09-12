import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { USStateMap } from "./USStateMap";
import { states, counties, RegionDB } from "@actnowcoalition/regions";

const statesAndCounties = new RegionDB([...states.all, ...counties.all]);

export default {
  title: "Components/USStateMap",
  component: USStateMap,
} as ComponentMeta<typeof USStateMap>;

const Template: ComponentStory<typeof USStateMap> = (args) => (
  <USStateMap {...args} />
);

const renderSimpleTooltip = (regionId: string) => {
  return statesAndCounties.findByRegionIdStrict(regionId).fullName;
};

export const StateWithoutBorderingStates = Template.bind({});
StateWithoutBorderingStates.args = {
  stateRegionId: "36",
  renderTooltip: (regionId: string) => renderSimpleTooltip(regionId),
  showBorderingStates: false,
  showCounties: false,
};

export const StateWithBorderingStates = Template.bind({});
StateWithBorderingStates.args = {
  stateRegionId: "36",
  renderTooltip: (regionId: string) => renderSimpleTooltip(regionId),
  showCounties: false,
};

export const CountiesWithoutBorderingStates = Template.bind({});
CountiesWithoutBorderingStates.args = {
  stateRegionId: "36",
  renderTooltip: (regionId: string) => renderSimpleTooltip(regionId),
  showBorderingStates: false,
};

export const CountiesWithBorderingStates = Template.bind({});
CountiesWithBorderingStates.args = {
  stateRegionId: "36",
  renderTooltip: (regionId: string) => renderSimpleTooltip(regionId),
};
