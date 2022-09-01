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
  { id: "states", buttonContent: "States" },
  { id: "counties", buttonContent: "Counties" },
];
const Template: ComponentStory<typeof OptionSelector> = (args) => (
  <OptionSelector {...args} />
);

export const DefaultProps = Template.bind({});
DefaultProps.args = { options, "aria-label": "States or counties" };

export const WithSelectedOption = Template.bind({});
WithSelectedOption.args = { options, selectedOptionId: "counties" };

/**
 * Since the content of the buttons is just an icon, we need to include the
 * ariaLabel property for each option to make the component accessible.
 */
const iconOptions = [
  {
    id: "justify",
    ariaLabel: "Justify",
    buttonContent: <FormatAlignJustify />,
  },
  {
    id: "align-left",
    ariaLabel: "Align left",
    buttonContent: <FormatAlignLeft />,
  },
  {
    id: "align-center",
    ariaLabel: "Align center",
    buttonContent: <FormatAlignCenter />,
  },
  {
    id: "align-right",
    ariaLabel: "Align right",
    buttonContent: <FormatAlignRight />,
  },
];

export const WithIcons = Template.bind({});
WithIcons.args = {
  "aria-label": "Alignment",
  options: iconOptions,
  selectedOptionId: "center",
  size: "small",
  onChange: (event: React.MouseEvent<HTMLElement>, optionId: string) => {
    console.log(`Selected ${optionId}`);
  },
};

export const Vertical = Template.bind({});
Vertical.args = {
  "aria-label": "Alignment",
  options: iconOptions,
  selectedOptionId: "center",
  orientation: "vertical",
  onChange: (event: React.MouseEvent<HTMLElement>, optionId: string) => {
    console.log(`Selected ${optionId}`);
  },
};
