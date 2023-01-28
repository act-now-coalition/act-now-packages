import React, { HTMLAttributes } from "react";

import SearchIcon from "@mui/icons-material/Search";
import {
  Autocomplete,
  AutocompleteChangeReason,
  AutocompleteProps,
  TextField,
  createFilterOptions,
} from "@mui/material";

import { Region, RegionDB } from "@actnowcoalition/regions";

import { formatPopulation } from "../../common/utils";
import { SearchItem } from "../SearchItem";
import { StyledListItem } from "./RegionSearch.style";

function stringifyOption(region: Region) {
  return region.fullName;
}

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
      onChange={(
        e,
        region: Region | null,
        reason: AutocompleteChangeReason
      ) => {
        if (region && reason === "selectOption") {
          // Typescript doesn't allow to assign a string to window.location
          // https://github.com/microsoft/TypeScript/issues/48949
          (window as any).location = regionDB.getRegionUrl(region);
        }
      }}
      clearIcon={<></>}
      forcePopupIcon={false}
      renderInput={customRenderInput ?? defaultRenderInput}
      renderOption={(props: HTMLAttributes<HTMLLIElement>, option: Region) => (
        <StyledListItem {...props}>
          <SearchItem
            itemLabel={option.shortName}
            itemSublabel={`${formatPopulation(option.population)} population`}
          />
        </StyledListItem>
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
