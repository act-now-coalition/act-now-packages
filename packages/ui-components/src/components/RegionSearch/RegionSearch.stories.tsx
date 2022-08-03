import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import RegionSearch from ".";
import { states, counties, metros } from "@actnowcoalition/regions";

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
