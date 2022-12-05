import React from "react";

import { MenuItem, TextField, Typography } from "@mui/material";

import { DropdownOption } from "../../common/utils/dropdown";

export interface SingleSelectDropdownProps {
  /** List of dropdown options */
  options: DropdownOption[];
  /** ID of the selected option */
  selectedOptionId: string;
  /** Label for the dropdown menu */
  label: string;
  /** Handler to call when the user selects an option */
  onSelectOption: (optionId: DropdownOption["id"]) => void;
}

/**
 * Simple dropdown menu that allows to select a single option. The component
 * is uncontrolled, so the parent needs to manage the state.
 */
export const SingleSelectDropdown = ({
  label,
  options,
  selectedOptionId,
  onSelectOption,
}: SingleSelectDropdownProps) => (
  <TextField
    select
    variant="filled"
    fullWidth
    label={<Typography variant="paragraphSmall">{label}</Typography>}
    value={selectedOptionId}
    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
      onSelectOption(event.target.value)
    }
  >
    {options.map(({ id, name }) => (
      <MenuItem key={id} value={id}>
        <Typography noWrap>{name}</Typography>
      </MenuItem>
    ))}
  </TextField>
);
