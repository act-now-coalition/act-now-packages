import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TextField, InputAdornment } from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import sortBy from "lodash/sortBy";
import { states, counties, metros } from "@actnowcoalition/regions";
import { RegionSearch } from ".";

export default {
  title: "Components/RegionSearch",
  component: RegionSearch,
} as ComponentMeta<typeof RegionSearch>;

const Template: ComponentStory<typeof RegionSearch> = (args) => (
  <RegionSearch {...args} />
);

const AnchorLinkComponent: React.FC<{
  children: React.ReactElement;
  targetUrl: string;
}> = ({ children, targetUrl }) => (
  <a href={targetUrl} style={{ textDecoration: "none" }}>
    {children}
  </a>
);

export const StatesOnly = Template.bind({});
StatesOnly.args = {
  options: states.all,
  inputLabel: "States",
  LinkComponent: AnchorLinkComponent,
};

export const CustomRenderInput = Template.bind({});
CustomRenderInput.args = {
  options: states.all,
  inputLabel: "States",
  LinkComponent: AnchorLinkComponent,
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
  options: sortBy(counties.all, (county) => county.population * -1),
  inputLabel: "Counties",
  LinkComponent: AnchorLinkComponent,
};

const allRegions = [...states.all, ...counties.all, ...metros.all];
export const AllRegions = Template.bind({});
AllRegions.args = {
  options: allRegions,
  LinkComponent: AnchorLinkComponent,
};
