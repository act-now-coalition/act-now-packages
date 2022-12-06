import React, { useState } from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Select, SelectOption, findOptionByValueStrict } from ".";
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

const selectedOption = findOptionByValueStrict(options, MetricId.APPLE_STOCK);

export const Example = Template.bind({});
Example.args = {
  label: "Metric",
  options,
  selectedOption,
};

/**
 * Example of how to implement a stateful component.
 */
interface StatefulSelectProps {
  label: string;
  options: SelectOption[];
  initiallySelectedOption: SelectOption;
}

const StatefulSelect = ({
  label,
  options,
  initiallySelectedOption,
}: StatefulSelectProps) => {
  const [selectedOption, setSelectedOption] = useState(initiallySelectedOption);

  const onSelectOption = (optionValue: string) => {
    const newSelectedOption = findOptionByValueStrict(options, optionValue);
    setSelectedOption(newSelectedOption);
  };

  return (
    <Select
      label={label}
      options={options}
      selectedOption={selectedOption}
      onSelectOption={onSelectOption}
    />
  );
};

export const WithState = () => (
  <StatefulSelect
    label="Metric"
    options={options}
    initiallySelectedOption={selectedOption}
  />
);
