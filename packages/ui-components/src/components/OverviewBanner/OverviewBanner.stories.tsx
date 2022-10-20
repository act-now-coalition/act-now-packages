import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { OverviewBanner } from ".";

export default {
  title: "Components/OverviewBanner",
  component: OverviewBanner,
} as ComponentMeta<typeof OverviewBanner>;

const Template: ComponentStory<typeof OverviewBanner> = (args) => (
  <OverviewBanner {...args} />
);

export const AllContent = Template.bind({});
AllContent.args = {
  title: "This is a title",
  body: (
    <>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit amet
      imperdiet lectus.{" "}
      <a href="www.google.com" style={{ color: "inherit" }}>
        This is a link
      </a>
      . <strong>This is bold text.</strong>
    </>
  ),
  primaryButton: {
    label: "Button 1",
    url: "www.google.com",
    onClick: () => {
      console.log("button 1 clicked");
    },
  },
  secondaryButton: {
    label: "Button 2",
    url: "www.nytimes.com",
  },
};

export const PartialContent = Template.bind({});
PartialContent.args = {
  body: (
    <>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit amet
      imperdiet lectus.
    </>
  ),
  primaryButton: {
    label: "Button 1",
    url: "www.google.com",
    onClick: () => {
      console.log("button 1 clicked");
    },
  },
};
