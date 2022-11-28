import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SortDirection } from "../../../common/utils/compare";
import { SortControls } from "..";

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
