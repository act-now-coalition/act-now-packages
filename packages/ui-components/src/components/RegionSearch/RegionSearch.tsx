import React, { HTMLAttributes } from "react";

import SearchIcon from "@mui/icons-material/Search";
import {
  Autocomplete,
  AutocompleteProps,
  TextField,
  createFilterOptions,
} from "@mui/material";

import { Region, RegionDB } from "@actnowcoalition/regions";

import { formatPopulation } from "../../common/utils";
import { SearchItem } from "../SearchItem";
import { StyledLink } from "./RegionSearch.style";

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
  false, // freeSolo
  "div" // ChipComponent
>;

export interface RegionSearchProps
  extends Omit<CustomAutocompleteProps, "renderInput"> {
  /**
   * RegionDB instance to use.
   */
  regionDB: RegionDB;
  /**
   * Placeholder text displayed in the text field.
   * @default "City, county, state, or district"
   */
  inputLabel?: string;
  /**
   * Function that renders the input.
   * See https://mui.com/material-ui/api/autocomplete/#props
   */
  renderInput?: CustomAutocompleteProps["renderInput"];
}

export const RegionSearch = ({
  regionDB,
  options,
  inputLabel = "City, county, state, or district",
  renderInput: customRenderInput,
  ...otherAutocompleteProps
}: RegionSearchProps) => {
  const defaultRenderInput: CustomAutocompleteProps["renderInput"] = (
    params
  ) => (
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
    <Autocomplete
      options={options}
      onChange={(e, item: Region | null) => onChange(item)}
      clearIcon={<></>}
      renderInput={customRenderInput ?? defaultRenderInput}
      renderOption={(props: HTMLAttributes<HTMLLIElement>, option: Region) => (
        <StyledLink href={regionDB.getRegionUrl(option)}>
          <SearchItem
            itemLabel={option.shortName}
            itemSublabel={`${formatPopulation(option.population)} population`}
            {...props}
          />
        </StyledLink>
      )}
      getOptionLabel={stringifyOption}
      filterOptions={createFilterOptions({
        limit: 30,
        stringify: stringifyOption,
      })}
      {...otherAutocompleteProps}
    />
  );
};
