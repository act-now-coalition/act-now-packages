import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import MetricOverview from ".";

export default {
  title: "Components/MetricOverview",
  component: MetricOverview,
} as ComponentMeta<typeof MetricOverview>;

const Template: ComponentStory<typeof MetricOverview> = (args) => (
  <div
    style={{
      width: args.size === "regular" ? 160 : 230,
      border: "dashed 1px #ddd",
    }}
  >
    <MetricOverview {...args} />
  </div>
);

export const Regular = Template.bind({});
Regular.args = { size: "regular" };

export const Compact = Template.bind({});
Compact.args = { size: "compact" };
