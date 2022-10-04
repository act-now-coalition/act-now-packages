import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ShareButton, ShareButtonProps } from ".";
import { Box } from "@mui/material";

export default {
  title: "Components/ShareButton",
  component: ShareButton,
} as ComponentMeta<typeof ShareButton>;

const Template: ComponentStory<typeof ShareButton> = (args) => (
  <Box display="flex" justifyContent="center">
    <ShareButton {...args} />
  </Box>
);

const args: ShareButtonProps = {
  url: "https://www.google.ca",
  quote: "This is google",
  hashtags: ["Hashtag1", "Hashtag2", "Hashtag3"],
  onCopyLink: () => console.log("Link copied"),
  onShareTwitter: () => console.log("Twitter button clicked"),
  onShareFacebook: () => console.log("Facebook button clicked"),
};

export const Default = Template.bind({});
Default.args = args;

export const SmallMainShareButton = Template.bind({});
SmallMainShareButton.args = {
  ...args,
  size: "small",
};

export const LargeMainShareButton = Template.bind({});
LargeMainShareButton.args = {
  ...args,
  size: "large",
};

export const CenterMenuOrigin = Template.bind({});
CenterMenuOrigin.args = {
  ...args,
  menuOrigin: "center",
};

export const RightMenuOrigin = Template.bind({});
RightMenuOrigin.args = {
  ...args,
  menuOrigin: "right",
};
