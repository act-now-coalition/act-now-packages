import { excludeTerritories, getGeoBorders, getGeoShapes } from "./utils";

import { ExtendedFeature } from "d3-geo";
import { Topology } from "topojson-specification";
import countiesJSON from "./counties-10m.json";

const countiesTopology = countiesJSON as unknown as Topology;

const allCounties = getGeoShapes(countiesTopology, "counties");

export const getCountyGeoId = (geoCounty: ExtendedFeature): string =>
  `${geoCounty.id}`;

export const countyBorders = getGeoBorders(countiesTopology, "counties");

export const countiesGeographies = excludeTerritories(
  allCounties,
  getCountyGeoId
);
