import React from "react";

import { Box, styled } from "@mui/material";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ShareButton, ShareButtonProps } from ".";

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

export const WithSmallAnchorButton = Template.bind({});
WithSmallAnchorButton.args = {
  ...args,
  size: "small",
};

export const WithCenterMenuOrigin = Template.bind({});
WithCenterMenuOrigin.args = {
  ...args,
  menuOrigin: "center",
};

export const WithRightMenuOrigin = Template.bind({});
WithRightMenuOrigin.args = {
  ...args,
  menuOrigin: "right",
};

const StyledButton = styled(ShareButton)`
  color: white;
  border-color: white;
  &:hover {
    border-color: white;
  }
`;

export const StyledAnchor = () => (
  <Box sx={{ padding: 4, backgroundColor: "#2c387e" }}>
    <StyledButton {...args} />
  </Box>
);
