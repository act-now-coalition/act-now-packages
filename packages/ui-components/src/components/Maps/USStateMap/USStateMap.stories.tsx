import React from "react";
import { Story, ComponentMeta } from "@storybook/react";
import { USStateMap } from "./USStateMap";
import { states, counties, RegionDB } from "@actnowcoalition/regions";
import { USStateMapProps } from "./interfaces";

const statesAndCounties = new RegionDB([...states.all, ...counties.all]);

export default {
  title: "Components/USStateMap",
  component: USStateMap,
} as ComponentMeta<typeof USStateMap>;

const Template: Story<USStateMapProps> = (args) => <USStateMap {...args} />;

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
