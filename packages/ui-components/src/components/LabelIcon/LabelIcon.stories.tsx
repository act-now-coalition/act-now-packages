import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { LabelIcon } from ".";

export default {
  title: "Components/LabelIcon",
  component: LabelIcon,
} as ComponentMeta<typeof LabelIcon>;

const Template: ComponentStory<typeof LabelIcon> = (args) => (
  <div style={{ width: 300 }}>
    <LabelIcon {...args} />
  </div>
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
  endIcon: <LibraryBooksIcon fontSize="small" color="inherit" />,
};
