import { counties, states } from "@actnowcoalition/regions";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { SearchItem } from "./SearchItem";

export default {
  title: "Components/SearchItem",
  component: SearchItem,
} as ComponentMeta<typeof SearchItem>;

const Template: ComponentStory<typeof SearchItem> = (args) => (
  <SearchItem {...args} />
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
