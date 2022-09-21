import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ShareButton, ShareButtonProps } from ".";

export default {
  title: "Components/ShareButton",
  component: ShareButton,
} as ComponentMeta<typeof ShareButton>;

const Template: ComponentStory<typeof ShareButton> = (args) => (
  <ShareButton {...args} />
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

export const CenterJustified = Template.bind({});
CenterJustified.args = {
  ...args,
  justifyButton: "center",
};

export const RightJustified = Template.bind({});
RightJustified.args = {
  ...args,
  justifyButton: "flex-end",
};
