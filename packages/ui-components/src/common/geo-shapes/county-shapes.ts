import { Topology } from "topojson-specification";
import { excludeTerritories, getGeoBorders, getGeoShapes } from "./utils";
import { ExtendedFeature } from "d3-geo";
import countiesJSON from "./counties-10m.json";
import { singletonHook } from "react-singleton-hook";
import { usePromise } from "../hooks";
import { importJson } from "../utils";

// Used in new implementation of CountiesMap
const countiesTopology = countiesJSON as unknown as Topology;

const allCounties = getGeoShapes(countiesTopology, "counties");

export const getCountyGeoId = (geoCounty: ExtendedFeature): string =>
  `${geoCounty.id}`;

export const countyBorders = getGeoBorders(countiesTopology, "counties");

export const countiesGeographies = excludeTerritories(
  allCounties,
  getCountyGeoId
);

// Used in original implementation of CountiesMap
export type CountiesTopology = typeof import("./counties-10m.json");

function importCountyGeographies(): Promise<CountiesTopology> {
  return importJson("counties-10m", import("./counties-10m.json"));
}

export const useCountyGeographies = singletonHook({ pending: true }, () =>
  usePromise(importCountyGeographies())
);
