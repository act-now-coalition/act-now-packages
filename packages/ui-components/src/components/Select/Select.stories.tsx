import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { assert } from "@actnowcoalition/assert";

import { Select } from ".";
import { MetricId, metricCatalog } from "../../stories/mockMetricCatalog";

export default {
  title: "Components/Select",
  component: Select,
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

const options = metricCatalog.metrics.map(({ id, name }) => ({
  value: id,
  label: name,
}));

const selectedOption = options.find(
  (option) => option.value === MetricId.APPLE_STOCK
);
assert(selectedOption, "The selectedOption cannot be undefined");

export const Example = Template.bind({});
Example.args = {
  label: "Metric",
  options,
  selectedOption,
};
