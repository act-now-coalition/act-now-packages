import React from "react";

import { ComponentMeta } from "@storybook/react";
import sortBy from "lodash/sortBy";

import { Region, states } from "@actnowcoalition/regions";

import { MultiSelect, MultiSelectProps, useMultiSelect } from ".";

export default {
  title: "Components/MultiSelect",
  component: MultiSelect,
} as ComponentMeta<typeof MultiSelect>;

const options: Region[] = sortBy(states.all, (state) => state.shortName);

const initiallySelectedOptions = options.slice(0, 4);

export const StatefulMultiSelect = ({
  label,
  options,
  selectedOptions: initiallySelectedOptions,
  getValue,
  getLabel,
}: Omit<MultiSelectProps<Region>, "onSelectOptions">) => {
  const [selectedOptions, setSelectedOptions] = useMultiSelect(
    initiallySelectedOptions
  );

  return (
    <MultiSelect
      label={label}
      options={options}
      selectedOptions={selectedOptions}
      onSelectOptions={setSelectedOptions}
      getLabel={getLabel}
      getValue={getValue}
    />
  );
};

export const Example = () => (
  <StatefulMultiSelect
    options={options}
    selectedOptions={initiallySelectedOptions}
    label="States"
    getValue={(state) => state.regionId}
    getLabel={(state) => state.shortName}
  />
);
