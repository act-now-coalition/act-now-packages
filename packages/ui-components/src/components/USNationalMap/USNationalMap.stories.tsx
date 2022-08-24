import React from "react";
import { Story, ComponentMeta } from "@storybook/react";
import USNationalMap, { USNationalMapProps } from "./USNationalMap";
import { scaleOrdinal, scaleLinear } from "@visx/scale";
import { states, counties, RegionDB } from "@actnowcoalition/regions";
import { interpolatePiYG } from "d3-scale-chromatic";

const regions = new RegionDB([...states.all, ...counties.all]);

export default {
  title: "Components/USNationalMap",
  component: USNationalMap,
} as ComponentMeta<typeof USNationalMap>;

const Template: Story<USNationalMapProps> = (args) => (
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

/** Counties with no fill color */
export const CountiesWithNoFillColor = Template.bind({});
CountiesWithNoFillColor.args = {
  showCounties: true,
  renderTooltip: (fips) => renderSimpleTooltip(fips),
};

const alphabetArr = "abcdefghijklmnopqrstuvwxyz".split("");

// Linear scale that scales a number between 0-25 into a corresponding number between 0-1
const testLinear = scaleLinear({
  domain: [0, 25],
  range: [0, 1],
});

// Creates an array of colors (in a continuous color scale) with as many colors as there are letters of the alphabet (26)
// Documentation re: `interpolatePiYG` - https://github.com/d3/d3-scale-chromatic/blob/main/README.md
const colors = alphabetArr.map((letter: string, i: number) =>
  interpolatePiYG(testLinear(i))
);

// Ordinal scale that takes a letter in the alphabet and returns the color from
// the `colors` array at the index that matches with the letter's index in the alphabet
const colorScaleAlpha = scaleOrdinal({
  domain: alphabetArr,
  range: colors,
});

const getFillColorByFirstLetter = (fips: string) => {
  const fullNameFromFips = regions
    .findByRegionIdStrict(fips)
    .fullName.toLowerCase();
  return colorScaleAlpha(fullNameFromFips[0]);
};

/** States colored by first letter of fullName */
export const StatesColoredByFirstLetter = Template.bind({});
StatesColoredByFirstLetter.args = {
  renderTooltip: (fips) => renderSimpleTooltip(fips),
  getFillColor: (fips) => getFillColorByFirstLetter(fips),
};

/** Counties colored by first letter of fullName */
export const CountiesColoredByFirstLetter = Template.bind({});
CountiesColoredByFirstLetter.args = {
  showCounties: true,
  renderTooltip: (fips) => renderSimpleTooltip(fips),
  getFillColor: (fips) => getFillColorByFirstLetter(fips),
};
