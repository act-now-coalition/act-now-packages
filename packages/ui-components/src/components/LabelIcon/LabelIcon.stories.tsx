import { LabelIcon } from ".";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

export default {
  title: "Components/LabelIcon",
  component: LabelIcon,
} as ComponentMeta<typeof LabelIcon>;

const Template: ComponentStory<typeof LabelIcon> = (args) => (
  <LabelIcon {...args} />
);

export const Example = Template.bind({});
Example.args = { children: "Weekly new cases" };

export const LongName = Template.bind({});
LongName.args = { children: "Super long metric name to test text wrapping" };

export const Custom = Template.bind({});
Custom.args = {
  children: "Learn more",
  color: "primary",
  variant: "labelSmall",
  endIcon: <LibraryBooksIcon fontSize="small" color="primary" />,
};
