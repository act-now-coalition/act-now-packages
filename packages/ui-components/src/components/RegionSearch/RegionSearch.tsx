import React from "react";
import { Container } from "./RegionSearch.style";
import { Region } from "@actnowcoalition/regions";
import { Autocomplete, AutocompleteProps, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { createFilterOptions } from "@mui/material/useAutocomplete";

function stringifyOption(region: Region) {
  return region.fullName;
}

const onChange = (item: Region | null) => {
  if (item && item.relativeUrl) {
    window.location.href = item.relativeUrl;
  }
};

export type CustomAutocompleteProps = AutocompleteProps<
  Region,
  false, // multiple
  false, // disableClearable
  false, // freeSsolo
  "div" // ChipComponent
>;

export interface RegionSearchProps extends CustomAutocompleteProps {
  /** Placeholder text to show in the inner text field  */
  inputLabel?: string;
}

export const RegionSearch: React.FC<RegionSearchProps> = ({
  options,
  inputLabel = "City, county, state, or district",
  renderInput: customRenderInput,
  ...otherAutocompleteProps
}) => {
  const defaultRenderInput: RegionSearchProps["renderInput"] = (params) => (
    <TextField
      {...params}
      label={inputLabel}
      variant="outlined"
      size="small"
      InputProps={{ ...params.InputProps, endAdornment: <SearchIcon /> }}
      inputProps={{ ...params.inputProps, "aria-label": "Search" }}
    />
  );

  return (
    <Container>
      <Autocomplete
        options={options}
        onChange={(e, item: Region | null) => onChange(item)}
        clearIcon={<></>}
        renderInput={customRenderInput ?? defaultRenderInput}
        getOptionLabel={stringifyOption}
        filterOptions={createFilterOptions({
          limit: 30,
          stringify: stringifyOption,
        })}
        {...otherAutocompleteProps}
      />
    </Container>
  );
};
