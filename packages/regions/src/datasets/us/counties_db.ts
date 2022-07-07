import RegionDB from "../../RegionDB";
import countiesJSON from "./counties.json";
import { County } from "./County";
import { State } from "./State";
import statesDB from "./states_db";

const counties = countiesJSON.map((county) => {
  const state = statesDB.findByRegionIdStrict(county.stateFipsCode);
  return new County(
    county.name,
    county.fipsCode,
    county.population,
    state as State
  );
});

const countiesDB = new RegionDB(counties);
export default countiesDB;
