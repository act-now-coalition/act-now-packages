import { useState } from "react";

import { validate } from "../../../validate";

export function useSelect<T>(
  items: T[],
  initialItem: T,
  getValue: (item: T) => string
): [T, (value: string) => void] {
  const [selectedOption, setSelectedOption] = useState(initialItem);

  function onSelectOption(value: string) {
    const foundOption = items.find((item) => getValue(item) === value);
    validate(foundOption, "Option not found");
    setSelectedOption(foundOption);
  }

  return [selectedOption, onSelectOption];
}
