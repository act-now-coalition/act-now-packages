import React from "react";

import { Autocomplete, Chip, TextField, Typography } from "@mui/material";

import { SelectOption } from "../Select";

export interface MultiSelectProps {
  /** Label for the selection menu */
  label: string;
  /** List of dropdown options  */
  options: SelectOption[];
  /** List of selected options */
  selectedOptions: SelectOption[];
  /** Handler to call when a user selects or removes an option */
  onSelectOptions: (selectedOptions: SelectOption[]) => void;
}

/**
 * Dropdown component that allows to select multiple options.
 * The component is uncontrolled, so the parent needs to
 * manage the state.
 */
export const MultiSelect = ({
  label,
  options,
  selectedOptions,
  onSelectOptions,
}: MultiSelectProps) => (
  <Autocomplete<
    SelectOption,
    /*Multiple=*/ true,
    /*DisableClearable*/ false,
    /* FreeSolo*/ false
  >
    multiple
    options={options}
    getOptionLabel={(item) => item.label}
    value={selectedOptions}
    isOptionEqualToValue={isOptionEqualToValue}
    onChange={(e: React.SyntheticEvent, options) => onSelectOptions(options)}
    ListboxProps={{ style: { maxHeight: 300 } }}
    renderInput={(params) => (
      <TextField
        {...params}
        variant="filled"
        label={<Typography variant="paragraphSmall">{label}</Typography>}
        InputLabelProps={{ shrink: true }}
        InputProps={{ ...params.InputProps, disableUnderline: true }}
        fullWidth
      />
    )}
    renderTags={(selectedOptions, getTagProps) =>
      selectedOptions.map((option, index) => (
        <Chip
          {...getTagProps({ index })}
          key={option.value}
          variant="outlined"
          label={option.label}
        />
      ))
    }
  />
);

function isOptionEqualToValue(optionA: SelectOption, optionB: SelectOption) {
  return optionA.value === optionB.value;
}
