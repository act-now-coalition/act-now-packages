import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SortControls, SortDirection } from "../";

import React from "react";

export default {
  title: "Table/SortControls",
  component: SortControls,
} as ComponentMeta<typeof SortControls>;

const Template: ComponentStory<typeof SortControls> = (args) => (
  <SortControls {...args} />
);

export const ActiveAsc = Template.bind({});
ActiveAsc.args = {
  sortDirection: SortDirection.ASC,
};

export const ActiveDesc = Template.bind({});
ActiveDesc.args = {
  sortDirection: SortDirection.DESC,
};

export const Inactive = Template.bind({});
Inactive.args = {};
