import { useState } from "react";

import { SelectOption } from "../Select";

export function useSelectedOptions<T>(
  items: T[],
  initialItems: T[],
  getOption: (item: T) => SelectOption
): [SelectOption[], SelectOption[], (options: SelectOption[]) => void, T[]] {
  const options = items.map(getOption);
  const initialOptions = initialItems.map(getOption);
  const [selectedOptions, setSelectedOptions] = useState(initialOptions);

  const selectedItems = selectedOptions
    .map(({ value }) => items.find((item) => getOption(item).value === value))
    .filter(isItem);

  return [options, selectedOptions, setSelectedOptions, selectedItems];
}

function isItem<T>(item: T | undefined): item is T {
  return !!item;
}
