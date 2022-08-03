import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RegionSearch from ".";
import { states, counties, metros } from "@actnowcoalition/regions";
import sortBy from "lodash/sortBy";

export default {
  title: "Components/RegionSearch",
  component: RegionSearch,
} as ComponentMeta<typeof RegionSearch>;

const Template: ComponentStory<typeof RegionSearch> = (args) => (
  <RegionSearch {...args} />
);

const allRegions = [...states.all, ...counties.all, ...metros.all];

export const AllRegionsSearch = Template.bind({});
AllRegionsSearch.args = {
  searchOptions: allRegions,
};

export const StatesOnlySearch = Template.bind({});
StatesOnlySearch.args = {
  searchOptions: states.all,
  inputLabel: "State",
};

export const CountiesOnlySearch = Template.bind({});
CountiesOnlySearch.args = {
  searchOptions: sortBy(counties.all, (county) => county.population * -1),
  inputLabel: "County",
};
