import React from "react";
import { Container } from "./RegionSearch.style";
import { Region } from "@actnowcoalition/regions";
import { Autocomplete, AutocompleteProps, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { createFilterOptions } from "@mui/material/useAutocomplete";

export interface RegionSearchProps {
  searchOptions: Region[];
  inputLabel?: string;
}

function stringifyOption(region: Region) {
  return region.fullName;
}

const onChange = (item: Region | null) => {
  if (!item) {
    return null;
  } else {
    window.location.href = item.relativeUrl;
  }
};

const RegionSearch: React.FC<
  RegionSearchProps &
    AutocompleteProps<
      Region,
      /** Multiple */ false,
      /** DisableClearable */ false,
      /** FreeSolo */ false,
      /** ChipComponent */ "div"
    >
> = ({
  searchOptions,
  inputLabel = "City, county, state, or district",
  ...otherProps
}) => {
  return (
    <Container>
      <Autocomplete
        {...otherProps}
        options={searchOptions}
        onChange={(e, item: Region | null) => onChange(item)}
        clearIcon={<></>}
        renderInput={(params) => (
          <TextField
            {...params}
            label={inputLabel}
            variant="outlined"
            size="small"
            InputProps={{ ...params.InputProps, endAdornment: <SearchIcon /> }}
            inputProps={{ ...params.inputProps, "aria-label": "Search" }}
          />
        )}
        getOptionLabel={stringifyOption}
        filterOptions={createFilterOptions({
          limit: 30,
          stringify: stringifyOption,
        })}
      />
    </Container>
  );
};

export default RegionSearch;
