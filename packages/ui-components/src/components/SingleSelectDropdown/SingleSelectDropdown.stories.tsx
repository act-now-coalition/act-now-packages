import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SingleSelectDropdown } from ".";
import { MetricId, metricCatalog } from "../../stories/mockMetricCatalog";

export default {
  title: "Components/SingleSelectDropdown",
  component: SingleSelectDropdown,
} as ComponentMeta<typeof SingleSelectDropdown>;

const Template: ComponentStory<typeof SingleSelectDropdown> = (args) => (
  <SingleSelectDropdown {...args} />
);

const options = metricCatalog.metrics.map(({ id, name }) => ({
  value: id,
  name,
}));

export const Example = Template.bind({});
Example.args = {
  label: "Metric",
  options,
  selectedOptionId: MetricId.MOCK_CASES,
};
