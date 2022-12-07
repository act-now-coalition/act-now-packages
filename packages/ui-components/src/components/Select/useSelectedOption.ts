import { useState } from "react";

import { assert } from "@actnowcoalition/assert";

import { SelectOption, findOptionByValueStrict } from "./Select";

export function useSelectedOption<T>(
  items: T[],
  initialItem: T,
  getOption: (item: T) => SelectOption
): [SelectOption[], SelectOption, (value: string) => void, T] {
  const options = items.map(getOption);
  const initialOption = getOption(initialItem);
  const [selectedOption, setSelectedOption] = useState(initialOption);

  const selectedItem = items.find(
    (item) => selectedOption.value === getOption(item).value
  );
  assert(selectedItem, `Item not found`);

  const onSelectOption = (value: string) => {
    const selectedOption = findOptionByValueStrict(options, value);
    setSelectedOption(selectedOption);
  };

  return [options, selectedOption, onSelectOption, selectedItem];
}
