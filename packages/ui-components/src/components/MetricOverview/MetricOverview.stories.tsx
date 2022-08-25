import React from "react";
import { Story, ComponentMeta } from "@storybook/react";
import { Metric, MetricData } from "@actnowcoalition/metrics";
import { states } from "@actnowcoalition/regions";
import MetricOverview, { MetricOverviewProps } from "./MetricOverview";

export default {
  title: "Components/MetricOverview",
  component: MetricOverview,
} as ComponentMeta<typeof MetricOverview>;

const Template: Story<MetricOverviewProps<number>> = (args) => {
  const width = args.size === "regular" ? 160 : 230;
  return (
    <div style={{ width, border: "dashed 1px #ddd" }}>
      <MetricOverview<number> {...args} />
    </div>
  );
};

const metric = new Metric({ id: "cases", name: "Cases per 100k" });
const region = states.findByRegionIdStrict("53");
const metricData: MetricData<number> = new MetricData(metric, region, 234.56);

export const Regular = Template.bind({});
Regular.args = { size: "regular", dataOrError: { data: metricData } };

export const ErrorState = Template.bind({});
ErrorState.args = {
  size: "regular",
  dataOrError: { error: new Error("Error fetching the metric") },
};

export const Compact = Template.bind({});
Compact.args = { size: "compact", dataOrError: { data: metricData } };
