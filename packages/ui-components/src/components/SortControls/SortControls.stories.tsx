import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SortControls, SortDirection } from ".";

export default {
  title: "Components/SortControls",
  component: SortControls,
} as ComponentMeta<typeof SortControls>;

const Template: ComponentStory<typeof SortControls> = (args) => (
  <SortControls {...args} />
);

export const ActiveAsc = Template.bind({});
ActiveAsc.args = {
  direction: SortDirection.ASC,
  active: true,
};

export const ActiveDesc = Template.bind({});
ActiveDesc.args = {
  direction: SortDirection.DESC,
  active: true,
};

export const Inactive = Template.bind({});
Inactive.args = {
  direction: SortDirection.DESC,
  active: false,
};
