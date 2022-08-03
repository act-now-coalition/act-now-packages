import React from "react";
import { Container } from "./RegionSearch.style";
import { Region } from "@actnowcoalition/regions";
import { Autocomplete, AutocompleteProps, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export interface RegionSearchProps {
  searchOptions: Region[];
  getIndicatorColor?: (region: Region) => string;
}

// function getOptionSelected(option: Region, selectedOption: Region) {
//   return option.regionId === selectedOption.regionId;
// }

// const onSelect = (e: React.ChangeEvent<{}>, value: Region) => {
//   // setIsOpen(false);
//   window.location.href = value.relativeUrl;
// };

const RegionSearch = /** type */ ({
  searchOptions,
}: RegionSearchProps &
  AutocompleteProps<Region, false, false, false, "div">) => {
  console.log("searchOptions", searchOptions);
  return (
    <Container>
      <Autocomplete
        options={searchOptions}
        renderInput={(params) => (
          <TextField
            {...params}
            label="City, county, state, or district"
            variant="outlined"
            size="small"
            InputProps={{ ...params.InputProps, endAdornment: <SearchIcon /> }}
            inputProps={{ ...params.inputProps, "aria-label": "Search" }}
          />
        )}
        getOptionLabel={() => ""} // we don't want the location name to populate the search bar after selecting
        // getOptionSelected={getOptionSelected}
      />
    </Container>
  );
};

export default RegionSearch;
