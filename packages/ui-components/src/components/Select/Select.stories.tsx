import React from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Metric } from "@actnowcoalition/metrics";

import { Select } from ".";
import { metricCatalog } from "../../stories/mockMetricCatalog";
import { useSelect } from "./useSelect";

export default {
  title: "Components/Select",
  component: Select,
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof StatefulSelect> = (args) => (
  <StatefulSelect {...args} />
);

const options = metricCatalog.metrics;

const initiallySelectedOption = options[0];

export const Example = Template.bind({});
Example.args = {
  label: "Metric",
  options,
  initiallySelectedOption,
};

/**
 * Example of how to implement a stateful component.
 */
interface StatefulSelectProps {
  label: string;
  options: Metric[];
  initiallySelectedOption: Metric;
}

const StatefulSelect = ({
  label,
  options,
  initiallySelectedOption,
}: StatefulSelectProps) => {
  const [selectedOption, onSelectOption] = useSelect(
    options,
    initiallySelectedOption,
    (item: Metric) => item.id
  );

  return (
    <Select
      label={label}
      options={options}
      selectedOption={selectedOption}
      onSelectOption={onSelectOption}
      getValue={(metric) => metric.id}
      getLabel={(metric) => metric.name}
    />
  );
};
