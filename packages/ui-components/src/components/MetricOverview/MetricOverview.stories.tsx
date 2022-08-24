import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Metric } from "@actnowcoalition/metrics";

import MetricOverview from ".";

export default {
  title: "Components/MetricOverview",
  component: MetricOverview,
} as ComponentMeta<typeof MetricOverview>;

const Template: ComponentStory<typeof MetricOverview> = (args) => (
  <div style={{ width: 160, border: "dashed 1px #ddd" }}>
    <MetricOverview {...args} />
  </div>
);

const TemplateCompact: ComponentStory<typeof MetricOverview> = (args) => (
  <div style={{ width: 230, border: "dashed 1px #ddd" }}>
    <MetricOverview {...args} />
  </div>
);

const metric = new Metric({
  id: "cases",
  name: "Cases per 100k",
});

export const Regular = Template.bind({});
Regular.args = { size: "regular", metric };

export const Compact = TemplateCompact.bind({});
Compact.args = { size: "compact", metric };
