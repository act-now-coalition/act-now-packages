import { useState } from "react";

import { assert } from "@actnowcoalition/assert";

export function useSelect<T>(
  items: T[],
  initialItem: T,
  getValue: (item: T) => string
): [T, (value: string) => void] {
  const [selectedOption, setSelectedOption] = useState(initialItem);

  function onSelectOption(value: string) {
    const foundOption = items.find((item) => getValue(item) === value);
    assert(foundOption, "Option not found");
    setSelectedOption(foundOption);
  }

  return [selectedOption, onSelectOption];
}
