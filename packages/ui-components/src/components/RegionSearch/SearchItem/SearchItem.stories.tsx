import React from "react";
import { ComponentMeta, Story } from "@storybook/react";
import { states, counties } from "@actnowcoalition/regions";
import { SearchItem, SearchItemProps } from "./SearchItem";

export default {
  title: "Components/SearchItem",
  component: SearchItem,
} as ComponentMeta<typeof SearchItem>;

const Template: Story<SearchItemProps> = (args) => <SearchItem {...args} />;

const newYork = states.findByRegionIdStrict("36");
const maricopaCounty = counties.findByRegionIdStrict("04013");

export const NewYork = Template.bind({});
NewYork.args = {
  itemLabel: newYork.fullName,
  itemSublabel: `${newYork.population} population`,
  itemUrl: newYork.relativeUrl,
};

export const NewYorkWithIndicator = Template.bind({});
NewYorkWithIndicator.args = {
  itemLabel: newYork.fullName,
  itemSublabel: `${newYork.population} population`,
  itemUrl: newYork.relativeUrl,
  iconColor: "red",
};

export const MaricopaCounty = Template.bind({});
MaricopaCounty.args = {
  itemLabel: maricopaCounty.shortName,
  itemSublabel: `${maricopaCounty.population} population`,
  itemUrl: maricopaCounty.relativeUrl,
};
