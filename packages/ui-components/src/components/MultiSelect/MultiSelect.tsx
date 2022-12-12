import React from "react";

import { Autocomplete, Chip, TextField, Typography } from "@mui/material";

export interface MultiSelectProps<T> {
  /** Label for the selection menu */
  label: string;
  /** List of dropdown options  */
  options: T[];
  /** List of selected options */
  selectedOptions: T[];
  /** Handler to call when a user selects or removes an option */
  onSelectOptions: (selectedOptions: T[]) => void;
  /** Function to get the label from an option */
  getLabel: (item: T) => string;
  /** Function to get the value from an option */
  getValue: (item: T) => string;
}

/**
 * Dropdown component that allows to select multiple options.
 * The component is uncontrolled, so the parent needs to
 * manage the state.
 */
export const MultiSelect = <T,>({
  label,
  options,
  selectedOptions,
  onSelectOptions,
  getLabel,
  getValue,
}: MultiSelectProps<T>) => (
  <Autocomplete<
    T,
    /*Multiple=*/ true,
    /*DisableClearable*/ false,
    /* FreeSolo*/ false
  >
    multiple
    options={options}
    getOptionLabel={getLabel}
    value={selectedOptions}
    isOptionEqualToValue={(a, b) => getValue(a) === getValue(b)}
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
          key={getValue(option)}
          variant="outlined"
          label={getLabel(option)}
        />
      ))
    }
  />
);
