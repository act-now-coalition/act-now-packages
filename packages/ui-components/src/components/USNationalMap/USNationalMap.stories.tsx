import { assert } from "@actnowcoalition/assert";
import { Region, RegionDB, counties, states } from "@actnowcoalition/regions";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { scaleLinear, scaleOrdinal } from "@visx/scale";
import { interpolatePiYG } from "d3-scale-chromatic";
import React from "react";

import { USNationalMap } from "./USNationalMap";

export default {
  title: "Maps/US National Map",
  component: USNationalMap,
} as ComponentMeta<typeof USNationalMap>;

const regionDB = new RegionDB([...states.all, ...counties.all], {
  getRegionUrl: (region: Region): string => `/us/${region.slug}`,
});

const Template: ComponentStory<typeof USNationalMap> = (args) => (
  <USNationalMap {...args} />
);

const renderTooltip = (regionId: string) => {
  return regionDB.findByRegionIdStrict(regionId).fullName;
};

const getRegionUrl = (regionId: string): string => {
  const region = regionDB.findByRegionIdStrict(regionId);
  const url = regionDB.getRegionUrl(region);
  assert(typeof url === "string", "RegionDB.getRegionUrl must be configured");
  return url;
};

/** States with no fill color */
export const States = Template.bind({});
States.args = { renderTooltip, getRegionUrl };

/** Counties with no fill color */
export const StatesWithCounties = Template.bind({});
StatesWithCounties.args = { showCounties: true, renderTooltip, getRegionUrl };

const alphabetArr = "abcdefghijklmnopqrstuvwxyz".split("");

// Linear scale that scales a number between 0-25 into a corresponding number between 0-1.
// https://observablehq.com/@d3/d3-scalelinear
const testLinear = scaleLinear({
  domain: [0, 25],
  range: [0, 1],
});

// Creates an array of colors (in a continuous color scale) with
// as many colors as there are letters of the alphabet (26).
// Docs re: `interpolatePiYG` - https://github.com/d3/d3-scale-chromatic/blob/main/README.md
const colors = alphabetArr.map((letter: string, i: number) =>
  interpolatePiYG(testLinear(i))
);

// Ordinal scale that takes a letter in the alphabet and returns the color from
// the `colors` array at the index that matches with the letter's index in the alphabet.
// https://observablehq.com/@d3/d3-scaleordinal
const colorScaleAlpha = scaleOrdinal({
  domain: alphabetArr,
  range: colors,
});

const getFillColorByFirstLetter = (region: Region) => {
  const fullNameFromFips = region.fullName.toLowerCase();
  return colorScaleAlpha(fullNameFromFips[0]);
};

const getFillColor = (regionId: string) => {
  const region = regionDB.findByRegionIdStrict(regionId);
  return getFillColorByFirstLetter(region);
};

/** States colored by first letter of fullName */
export const StatesColoredByFirstLetter = Template.bind({});
StatesColoredByFirstLetter.args = {
  renderTooltip,
  getFillColor,
  getRegionUrl,
};

/** Counties colored by first letter of fullName */
export const CountiesColoredByFirstLetter = Template.bind({});
CountiesColoredByFirstLetter.args = {
  showCounties: true,
  renderTooltip,
  getFillColor,
  getRegionUrl,
};
