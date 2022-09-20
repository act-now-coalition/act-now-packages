import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ShareButton } from ".";

export default {
  title: "Components/ShareButton",
  component: ShareButton,
} as ComponentMeta<typeof ShareButton>;

const Template: ComponentStory<typeof ShareButton> = (args) => (
  <ShareButton {...args} />
);

export const Example = Template.bind({});
Example.args = {
  url: "https://www.google.ca",
  quote: "This is google",
  onCopyLink: () => console.log("Link copied"),
  onShareTwitter: () => console.log("Twitter button clicked"),
  onShareFacebook: () => console.log("Facebook button clicked"),
};
