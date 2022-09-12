import React from "react";
import { Story, ComponentMeta } from "@storybook/react";
import { USStateMap } from "./USStateMap";
import { states, counties, RegionDB } from "@actnowcoalition/regions";
import { USStateMapProps } from "./interfaces";

const statesAndCounties = new RegionDB([...states.all, ...counties.all]);

export default {
  title: "Components/Maps/US State",
  component: USStateMap,
} as ComponentMeta<typeof USStateMap>;

const Template: Story<USStateMapProps> = (args) => <USStateMap {...args} />;

const renderSimpleTooltip = (regionId: string) => {
  return statesAndCounties.findByRegionIdStrict(regionId).fullName;
};

export const NewYorkWithoutBorderingStates = Template.bind({});
NewYorkWithoutBorderingStates.args = {
  stateRegionId: "36",
  renderTooltip: (regionId: string) => renderSimpleTooltip(regionId),
  showBorderingStates: false,
  showCounties: false,
};

export const NewYorkWithBorderingStates = Template.bind({});
NewYorkWithBorderingStates.args = {
  stateRegionId: "36",
  renderTooltip: (regionId: string) => renderSimpleTooltip(regionId),
  showCounties: false,
};

export const NewYorkCountiesWithoutBorderingStates = Template.bind({});
NewYorkCountiesWithoutBorderingStates.args = {
  stateRegionId: "36",
  renderTooltip: (regionId: string) => renderSimpleTooltip(regionId),
  showBorderingStates: false,
};

export const NewYorkCountiesWithBorderingStates = Template.bind({});
NewYorkCountiesWithBorderingStates.args = {
  stateRegionId: "36",
  renderTooltip: (regionId: string) => renderSimpleTooltip(regionId),
};
