import React from "react";

import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { LabelIcon } from ".";

export default {
  title: "Components/LabelIcon",
  component: LabelIcon,
} as ComponentMeta<typeof LabelIcon>;

const Template: ComponentStory<typeof LabelIcon> = (args) => (
  <LabelIcon {...args} />
);

export const Example = Template.bind({});
Example.args = { children: "Weekly new cases" };

export const WithLongText = Template.bind({});
WithLongText.args = {
  children: "Super long metric name to test text wrapping",
};

export const WithCustomIcon = Template.bind({});
WithCustomIcon.args = {
  children: "Learn more",
  color: "primary",
  variant: "labelSmall",
  endIcon: <LibraryBooksIcon fontSize="small" color="primary" />,
};
