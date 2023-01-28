import React from "react";

import { MenuItem, TextField, Typography, useTheme } from "@mui/material";

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
}: SelectProps<T>) => {
  const theme = useTheme();
  return (
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
        // Make sure we include all SelectProps set at the theme-level
        ...theme.components?.MuiTextField?.defaultProps?.SelectProps,
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
};
