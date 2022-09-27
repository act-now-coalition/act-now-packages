import React from "react";
import min from "lodash/min";
import max from "lodash/max";
import { Story, ComponentMeta } from "@storybook/react";
import { USNationalMap } from "./USNationalMap";
import { scaleLinear } from "@visx/scale";
import { USCountiesMap, USCountiesMapProps } from "./USCountiesMap";
import {
  defaultHeight,
  defaultScale,
  defaultWidth,
} from "../../../common/geo-shapes";
import { geoAlbersUsa } from "d3-geo";
import { counties } from "@actnowcoalition/regions";

export default {
  title: "Maps/USCountiesMap",
  component: USNationalMap,
} as ComponentMeta<typeof USNationalMap>;

const Template: Story<USCountiesMapProps> = (args) => (
  <svg width={args.width} height={args.height}>
    <USCountiesMap {...args} />
  </svg>
);

const width = 600;
const height = defaultHeight * (width / defaultWidth);
const scale = (defaultScale * width) / defaultWidth;

const canvasProjection = geoAlbersUsa()
  .scale(2 * scale)
  .translate([width, height]);

const countyRegionIds = counties.all.map((c) => Number(c.regionId));
const minValue = min(countyRegionIds) || 0;
const maxValue = max(countyRegionIds) || 100;

const colorScale = scaleLinear({
  domain: [minValue, maxValue],
  range: ["#dd33fa", "#4615b2"],
});

export const Example = Template.bind({});
Example.args = {
  width: 600,
  height: 400,
  getFillColor: (countyId: string) => colorScale(Number(countyId)),
  geoProjection: canvasProjection,
  getGeoId: (geo) => `${geo.id}`,
};
