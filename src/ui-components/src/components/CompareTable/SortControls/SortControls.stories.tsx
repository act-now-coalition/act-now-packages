import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SortControls, SortDirection } from "..";

export default {
  title: "Components/SortControls",
  component: SortControls,
} as ComponentMeta<typeof SortControls>;

const Template: ComponentStory<typeof SortControls> = (args) => (
  <SortControls {...args} />
);

export const ActiveAscending = Template.bind({});
ActiveAscending.args = {
  sortDirection: SortDirection.ASC,
};

export const ActiveDescending = Template.bind({});
ActiveDescending.args = {
  sortDirection: SortDirection.DESC,
};

export const Inactive = Template.bind({});
Inactive.args = {};
