import React, { HTMLAttributes } from "react";
import {
  Autocomplete,
  AutocompleteProps,
  TextField,
  createFilterOptions,
  Stack,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Region, RegionDB } from "@actnowcoalition/regions";
import { formatPopulation } from "../../common/utils";
import {
  StyledLink,
  CircleIcon,
  ArrowIcon,
  Container,
} from "./RegionSearch.style";

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
  /** RegionDB instance for the application */
  regionDB: RegionDB;
  /** Placeholder text to show in the inner text field  */
  inputLabel?: string;
  /** Optional renderInput function. See https://mui.com/material-ui/api/autocomplete/ */
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
          <RegionSearchItem
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

export interface RegionSearchItemProps {
  /** Top label of the search item, in bold text. */
  itemLabel: string;
  /** Secondary label of the search item, in grey deemphasized text. */
  itemSublabel: string;
  /** Circle icon color. If omitted, no circle icon will render. */
  iconColor?: string;
}

export const RegionSearchItem = ({
  itemLabel,
  itemSublabel,
  iconColor,
}: RegionSearchItemProps) => {
  return (
    <Container>
      <Stack direction="row">
        {iconColor && <CircleIcon iconColor={iconColor} />}
        <Stack spacing={0.5}>
          <Typography variant="labelLarge">{itemLabel}</Typography>
          <Typography variant="paragraphSmall">{itemSublabel}</Typography>
        </Stack>
      </Stack>
      <ArrowIcon />
    </Container>
  );
};
