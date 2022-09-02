import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { states } from "@actnowcoalition/regions";
import { MetricId } from "../../stories/mockMetricCatalog";
import { MetricValue } from ".";

export default {
  title: "Metrics/MetricValue",
  component: MetricValue,
} as ComponentMeta<typeof MetricValue>;

const Template: ComponentStory<typeof MetricValue> = (args) => (
  <MetricValue {...args} />
);

const washingtonState = states.findByRegionIdStrict("53");

export const DefaultVariant = Template.bind({});
DefaultVariant.args = {
  region: washingtonState,
  metric: MetricId.MOCK_CASES,
};

export const DataTabular = Template.bind({});
DataTabular.args = { ...DefaultVariant.args, variant: "dataTabular" };

export const AlignedRight = () => (
  <div
    style={{
      width: 300,
      border: "dashed 1px #eee",
      display: "flex",
      justifyContent: "flex-end",
    }}
  >
    <MetricValue
      region={washingtonState}
      metric={MetricId.MOCK_CASES}
      style={{ width: "fit-content" }}
    />
  </div>
);

export const SpaceBetween = () => (
  <MetricValue
    region={washingtonState}
    metric={MetricId.MOCK_CASES}
    justifyContent="space-between"
    style={{ width: 300, border: "dashed 1px #eee" }}
  />
);