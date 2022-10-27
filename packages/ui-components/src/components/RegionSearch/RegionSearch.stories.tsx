import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TextField, InputAdornment } from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import sortBy from "lodash/sortBy";
import {
  states,
  counties,
  metros,
  RegionDB,
  Region,
} from "@actnowcoalition/regions";
import { RegionSearch } from ".";

export default {
  title: "Components/RegionSearch",
  component: RegionSearch,
} as ComponentMeta<typeof RegionSearch>;

const regionDB = new RegionDB([...states.all, ...counties.all], {
  getRegionUrl: (region: Region): string => `/us/${region.slug}`,
});

const Template: ComponentStory<typeof RegionSearch> = (args) => (
  <RegionSearch {...args} />
);

export const StatesOnly = Template.bind({});
StatesOnly.args = {
  regionDB,
  options: states.all,
  inputLabel: "States",
};

export const CustomRenderInput = Template.bind({});
CustomRenderInput.args = {
  regionDB,
  options: states.all,
  inputLabel: "States",
  renderInput: (params) => (
    <TextField
      {...params}
      sx={{ backgroundColor: "#E3F2FD" }}
      label="Custom renderInput"
      InputProps={{
        ...params.InputProps,
        endAdornment: (
          <InputAdornment position="end">
            <MapIcon />
          </InputAdornment>
        ),
      }}
    />
  ),
};

export const CountiesOnly = Template.bind({});
CountiesOnly.args = {
  regionDB,
  options: sortBy(counties.all, (county) => county.population * -1),
  inputLabel: "Counties",
};

const allRegions = [...states.all, ...counties.all, ...metros.all];
export const AllRegions = Template.bind({});
AllRegions.args = {
  regionDB,
  options: allRegions,
};
