import React from "react";

import { MenuItem, TextField, Typography } from "@mui/material";

import { assert } from "@actnowcoalition/assert";

export interface SelectProps<T> {
  /** List of dropdown options */
  options: T[];
  /** Selected option */
  selectedOption: T;
  /** Label for the selection menu */
  label: string;
  /** Function to access the option value */
  getValue: (item: T) => string;
  /** Function to access the option label */
  getLabel: (item: T) => string;
  /** Handler to call when the user selects an option */
  onSelectOption: (value: string) => void;
}

/**
 * Simple dropdown menu that allows to select a single option. The component
 * is uncontrolled, so the parent needs to manage the state.
 */
export const Select = <T,>({
  label,
  options,
  selectedOption,
  onSelectOption,
  getValue,
  getLabel,
}: SelectProps<T>) => (
  <TextField
    select
    variant="filled"
    fullWidth
    label={<Typography variant="paragraphSmall">{label}</Typography>}
    value={getValue(selectedOption)}
    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
      onSelectOption(event.target.value)
    }
    SelectProps={{
      disableUnderline: true,
      MenuProps: { style: { maxHeight: 300 } },
    }}
  >
    {options.map((option) => (
      <MenuItem key={getValue(option)} value={getValue(option)}>
        <Typography noWrap>{getLabel(option)}</Typography>
      </MenuItem>
    ))}
  </TextField>
);

/**
 * Utility function to find the option by value. It throws an error if the
 * option is not found.
 * @param options List of SelectOptions
 * @param value  value of the option that we want to find
 * @returns The found option
 */
export function findOptionByValueStrict(
  options: SelectOption[],
  value: SelectOption["value"]
): SelectOption {
  const foundOption = options.find((option) => option.value === value);
  assert(!!foundOption, `Option with value '${value}' not found.`);
  return foundOption;
}
