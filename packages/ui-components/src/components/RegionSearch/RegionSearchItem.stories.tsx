import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { states, counties } from "@actnowcoalition/regions";
import { RegionSearchItem } from "./RegionSearch";

export default {
  title: "Components/RegionSearchItem",
  component: RegionSearchItem,
} as ComponentMeta<typeof RegionSearchItem>;

const Template: ComponentStory<typeof RegionSearchItem> = (args) => (
  <RegionSearchItem {...args} />
);

const newYork = states.findByRegionIdStrict("36");
const maricopaCounty = counties.findByRegionIdStrict("04013");

export const NewYork = Template.bind({});
NewYork.args = {
  itemLabel: newYork.fullName,
  itemSublabel: `${newYork.population} population`,
};

export const NewYorkWithIndicator = Template.bind({});
NewYorkWithIndicator.args = {
  itemLabel: newYork.fullName,
  itemSublabel: `${newYork.population} population`,
  iconColor: "red",
};

export const MaricopaCounty = Template.bind({});
MaricopaCounty.args = {
  itemLabel: maricopaCounty.shortName,
  itemSublabel: `${maricopaCounty.population} population`,
};
