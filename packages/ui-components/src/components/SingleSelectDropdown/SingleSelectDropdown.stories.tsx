import React, { useState } from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SingleSelectDropdown, SingleSelectDropdownProps } from ".";
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

const ControlledSingleSelect = ({
  label,
  options,
  selectedOptionId: initialSelectedOptionId,
}: Omit<SingleSelectDropdownProps, "onSelectOption">) => {
  const [selectedOptionId, setSelectedOptionId] = useState(
    initialSelectedOptionId
  );

  return (
    <SingleSelectDropdown
      label={label}
      options={options}
      selectedOptionId={selectedOptionId}
      onSelectOption={setSelectedOptionId}
    />
  );
};

export const WithState = () => (
  <ControlledSingleSelect
    label="Metric"
    options={options}
    selectedOptionId={MetricId.APPLE_STOCK}
  />
);
