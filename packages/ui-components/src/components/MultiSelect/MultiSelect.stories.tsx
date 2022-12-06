import React, { useState } from "react";

import { ComponentMeta, ComponentStory } from "@storybook/react";

import { states } from "@actnowcoalition/regions";

import { MultiSelect } from ".";
import { SelectOption } from "../Select";

export default {
  title: "Components/MultiSelect",
  component: MultiSelect,
} as ComponentMeta<typeof MultiSelect>;

const Template: ComponentStory<typeof MultiSelect> = (args) => (
  <MultiSelect {...args} />
);

const options: SelectOption[] = states.all.map((state) => ({
  value: state.regionId,
  label: state.shortName,
}));

const initiallySelectedOptions = options.slice(0, 4);

export const Example = Template.bind({});
Example.args = {
  label: "States",
  options,
  selectedOptions: initiallySelectedOptions,
};

export const StatefulMultiSelect = () => {
  const [selectedOptions, setSelectedOptions] = useState(
    initiallySelectedOptions
  );

  return (
    <MultiSelect
      label="States"
      options={options}
      selectedOptions={selectedOptions}
      onSelectOptions={setSelectedOptions}
    />
  );
};
