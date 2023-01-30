import React from "react";

import MapIcon from "@mui/icons-material/Map";
import { InputAdornment, TextField } from "@mui/material";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import sortBy from "lodash/sortBy";

import { RegionSearch } from ".";
import { Region, RegionDB, counties, metros, states } from "../../../regions";

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

export const States = Template.bind({});
States.args = {
  regionDB,
  options: states.all,
  inputLabel: "States",
};

export const Counties = Template.bind({});
Counties.args = {
  regionDB,
  options: sortBy(counties.all, (county) => county.population * -1),
  inputLabel: "Counties",
};

const allUSRegions = [...states.all, ...counties.all, ...metros.all];
export const AllUSRegions = Template.bind({});
AllUSRegions.args = {
  regionDB,
  options: allUSRegions,
};

export const WithCustomRenderInput = Template.bind({});
WithCustomRenderInput.args = {
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
