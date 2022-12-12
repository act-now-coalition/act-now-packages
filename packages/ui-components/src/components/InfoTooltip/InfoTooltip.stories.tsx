import React from "react";

import { Typography } from "@mui/material";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { InfoTooltip } from ".";

export default {
  title: "Components/InfoTooltip",
  component: InfoTooltip,
} as ComponentMeta<typeof InfoTooltip>;

function TooltipTitle() {
  return (
    <>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt itaque
      mollitia culpa, magni maxime repudiandae corrupti sed quaerat nulla optio
      in voluptate ad ipsa! Velit aspernatur porro tenetur rerum maxime!{" "}
      <a href="www.google.com">Test link</a>
    </>
  );
}

const Template: ComponentStory<typeof InfoTooltip> = (args) => {
  return (
    <InfoTooltip {...args}>
      <Typography variant="paragraphSmall">Trigger tooltip</Typography>
    </InfoTooltip>
  );
};

export const Default = Template.bind({});
Default.args = {
  title: <TooltipTitle />,
};

export const WithAddedOnOpenOnClose = Template.bind({});
WithAddedOnOpenOnClose.args = {
  title: <TooltipTitle />,
  onOpen: () => {
    console.log("onOpen, optional tracking functionality");
  },
  onClose: () => {
    console.log("onClose, optional tracking functionality");
  },
};
