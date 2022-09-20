import React from "react";
import { Story, ComponentMeta } from "@storybook/react";
import { USNationalMap } from "./USNationalMap";
import { USNationalMapProps } from "./interfaces";
import { states, Region } from "@actnowcoalition/regions";
import { interpolatePiYG } from "d3-scale-chromatic";
import { scaleOrdinal, scaleLinear } from "@visx/scale";

export default {
  title: "Maps/US National",
  component: USNationalMap,
} as ComponentMeta<typeof USNationalMap>;

const Template: Story<USNationalMapProps> = (args) => (
  <USNationalMap {...args} />
);

const renderSimpleTooltip = (regionId: string) => {
  return states.findByRegionIdStrict(regionId).fullName;
};

/** States with no fill color */
export const States = Template.bind({});
States.args = {
  renderTooltip: (regionId: string) => renderSimpleTooltip(regionId),
};

/** Counties with no fill color */
export const StatesWithCounties = Template.bind({});
StatesWithCounties.args = {
  showCounties: true,
  renderTooltip: (regionId: string) => renderSimpleTooltip(regionId),
};

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

/** States colored by first letter of fullName */
export const StatesColoredByFirstLetter = Template.bind({});
StatesColoredByFirstLetter.args = {
  renderTooltip: (regionId: string) => renderSimpleTooltip(regionId),
  getFillColor: (region: Region) => getFillColorByFirstLetter(region),
};

/** Counties colored by first letter of fullName */
export const CountiesColoredByFirstLetter = Template.bind({});
CountiesColoredByFirstLetter.args = {
  showCounties: true,
  renderTooltip: (regionId: string) => renderSimpleTooltip(regionId),
  getFillColor: (region: Region) => getFillColorByFirstLetter(region),
};
