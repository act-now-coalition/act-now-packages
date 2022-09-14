import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SocialMetaTags } from ".";

export default {
  title: "Components/SocialMetaTags",
  component: SocialMetaTags,
} as ComponentMeta<typeof SocialMetaTags>;

const Template: ComponentStory<typeof SocialMetaTags> = (args) => (
  <div>
    Inspect the page to see the meta tags.
    <SocialMetaTags {...args} />
  </div>
);

export const Example = Template.bind({});
Example.args = {
  siteName: "Sample site name",
  url: "https://www.covidactnow.org",
  title: "Sample title",
  description: "Sample description",
  fbImg: "https://covidactnow-prod.web.app/share/3995-2743/home.png",
  twitterImg: "https://covidactnow-prod.web.app/share/3995-2743/home.png",
};
