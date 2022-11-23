import { excludeTerritories, getGeoBorders, getGeoShapes } from "./utils";

import { ExtendedFeature } from "d3-geo";
import { Topology } from "topojson-specification";
import statesJSON from "./states-10m.json";

const statesTopology = statesJSON as unknown as Topology;

const getStateGeoId = (geoState: ExtendedFeature): string => `${geoState.id}`;

const allStates = getGeoShapes(statesTopology, "states");

export const statesGeographies = excludeTerritories(allStates, getStateGeoId);

export const stateBorders = getGeoBorders(statesTopology, "states");
