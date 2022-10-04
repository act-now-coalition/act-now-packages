import React, { HTMLAttributes } from "react";
import { Region } from "@actnowcoalition/regions";
import { formatDecimal } from "@actnowcoalition/number-format";
import { Autocomplete, AutocompleteProps, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { createFilterOptions } from "@mui/material/useAutocomplete";
import { SearchItem } from "./SearchItem/SearchItem";

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
  /** Link component in which to wrap the search item. */
  LinkComponent: React.FC<{
    children: React.ReactElement;
    targetUrl: string;
  }>;
  getRegionUrl: (regionId: string) => string;
  /** Placeholder text to show in the inner text field  */
  inputLabel?: string;
  /** Optional renderInput function. See https://mui.com/material-ui/api/autocomplete/ */
  renderInput?: CustomAutocompleteProps["renderInput"];
}

export const RegionSearch: React.FC<RegionSearchProps> = ({
  options,
  inputLabel = "City, county, state, or district",
  renderInput: customRenderInput,
  LinkComponent,
  getRegionUrl,
  ...otherAutocompleteProps
}) => {
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
    <div>
      <Autocomplete
        options={options}
        onChange={(e, item: Region | null) => onChange(item)}
        clearIcon={<></>}
        renderInput={customRenderInput ?? defaultRenderInput}
        renderOption={(
          props: HTMLAttributes<HTMLLIElement>,
          option: Region
        ) => {
          return (
            <LinkComponent targetUrl={getRegionUrl(option.regionId)}>
              <SearchItem
                itemLabel={option.shortName}
                itemSublabel={`${formatPopulation(
                  option.population
                )} population`}
                {...props}
              />
            </LinkComponent>
          );
        }}
        getOptionLabel={stringifyOption}
        filterOptions={createFilterOptions({
          limit: 30,
          stringify: stringifyOption,
        })}
        {...otherAutocompleteProps}
      />
    </div>
  );
};

/**
 * Format the population with thousands separator and keeping 3 significant
 * digits.
 *
 * @example
 * ```ts
 * formatPopulation(107766) // 108,000
 * ```
 */
function formatPopulation(population: number) {
  return formatDecimal(population, {
    maximumSignificantDigits: 3,
    maximumFractionDigits: 0,
  });
}
