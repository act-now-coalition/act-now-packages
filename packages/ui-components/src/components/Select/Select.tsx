import React from "react";

import { MenuItem, TextField, Typography } from "@mui/material";

import { assert } from "@actnowcoalition/assert";

/**
 * Interface to represent selection options
 */
export interface SelectOption {
  /** Unique identifier for the option */
  value: string;
  /** Option label */
  label: string;
}

export interface SelectProps {
  /** List of dropdown options */
  options: SelectOption[];
  /** Selected option */
  selectedOption: SelectOption;
  /** Label for the selection menu */
  label: string;
  /** Handler to call when the user selects an option */
  onSelectOption: (optionId: SelectOption["value"]) => void;
}

/**
 * Simple dropdown menu that allows to select a single option. The component
 * is uncontrolled, so the parent needs to manage the state.
 */
export const Select = ({
  label,
  options,
  selectedOption,
  onSelectOption,
}: SelectProps) => (
  <TextField
    select
    variant="filled"
    fullWidth
    label={<Typography variant="paragraphSmall">{label}</Typography>}
    value={selectedOption.value}
    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
      onSelectOption(event.target.value)
    }
  >
    {options.map(({ value, label }) => (
      <MenuItem key={value} value={value}>
        <Typography noWrap>{label}</Typography>
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
