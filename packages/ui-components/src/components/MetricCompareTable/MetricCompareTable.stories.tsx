import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { states } from "@actnowcoalition/regions";
import { MetricId } from "../../stories/mockMetricCatalog";
import { MetricCompareTable } from ".";

export default {
  title: "Metrics/MetricCompareTable",
  component: MetricCompareTable,
} as ComponentMeta<typeof MetricCompareTable>;

const Template: ComponentStory<typeof MetricCompareTable> = (args) => (
  <div
    style={{
      width: 600,
      height: 600,
      overflow: "auto",
      border: "solid 1px #0969da",
    }}
  >
    <MetricCompareTable {...args} />
  </div>
);

export const Example = Template.bind({});
Example.args = {
  regions: states.all,
  metrics: [
    MetricId.MOCK_CASES,
    MetricId.PI,
    MetricId.MOCK_CASES,
    MetricId.MOCK_CASES,
    MetricId.MOCK_CASES,
    MetricId.MOCK_CASES,
  ],
};
