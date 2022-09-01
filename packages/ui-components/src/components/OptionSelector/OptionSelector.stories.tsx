import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import {
  FormatAlignLeft,
  FormatAlignRight,
  FormatAlignCenter,
  FormatAlignJustify,
} from "@mui/icons-material";
import OptionSelector from "./OptionSelector";

export default {
  title: "Inputs/OptionSelector",
  component: OptionSelector,
} as ComponentMeta<typeof OptionSelector>;

const options = [
  { id: "item1", content: "Option 1" },
  { id: "item2", content: "Option 2" },
  { id: "item3", content: "Option 3" },
];
const Template: ComponentStory<typeof OptionSelector> = (args) => (
  <OptionSelector {...args} />
);

export const DefaultProps = Template.bind({});
DefaultProps.args = { options };

export const WithSelectedOption = Template.bind({});
WithSelectedOption.args = { options, selectedOptionId: "item3" };

const iconOptions = [
  { id: "justify", content: <FormatAlignJustify /> },
  { id: "left", content: <FormatAlignLeft /> },
  { id: "center", content: <FormatAlignCenter /> },
  { id: "right", content: <FormatAlignRight /> },
];

export const WithIcons = Template.bind({});
WithIcons.args = {
  options: iconOptions,
  selectedOptionId: "center",
  size: "small",
};
