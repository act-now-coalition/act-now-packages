import React from "react";
import minBy from "lodash/minBy";
import maxBy from "lodash/maxBy";
import keyBy from "lodash/keyBy";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import USNationalMap from "./USNationalMap";
import { scaleQuantize } from "@visx/scale";
import { states } from "@actnowcoalition/regions";

export default {
  title: "Components/USNationalMap",
  component: USNationalMap,
} as ComponentMeta<typeof USNationalMap>;

const Template: ComponentStory<typeof USNationalMap> = (args) => (
  <USNationalMap {...args} />
);

const renderSimpleTooltip = (fips: string) => {
  return states.findByRegionIdStrict(fips).fullName;
};

/** States with no fill color */
export const StatesWithNoFillColor = Template.bind({});
StatesWithNoFillColor.args = {
  renderTooltip: (fips) => renderSimpleTooltip(fips),
};

/** States colored by length of state's fullName */
const stateNames = Object.keys(keyBy(states.all, (state) => state.fullName));

const getGeoFillColorByStateNameLength = (fips: string) => {
  const stateName = states.findByRegionIdStrict(fips).fullName;
  return colorScaleByStateNameLength(stateName.length);
};

const minStateLength =
  minBy(stateNames, (stateName) => stateName.length)?.length || 4;
const maxStateLength =
  maxBy(stateNames, (stateName) => stateName.length)?.length || 40;

const colorScaleByStateNameLength = scaleQuantize({
  domain: [minStateLength, maxStateLength],
  range: [
    "#119146" /* green */,
    "#FFCC07" /* yellow */,
    "#F68E1D" /* orange */,
    "#F04623" /* dark orange */,
    "#BC2026" /* red */,
  ],
});

export const StatesColoredByNameLength = Template.bind({});
StatesColoredByNameLength.args = {
  getGeoFillColor: (fips) => getGeoFillColorByStateNameLength(fips),
  renderTooltip: (fips) => renderSimpleTooltip(fips),
};
