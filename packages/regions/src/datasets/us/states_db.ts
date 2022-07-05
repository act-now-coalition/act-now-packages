import statesJSON from "./states.json";
import { State } from "./State";
import RegionDB from "../../RegionDB";

const states = statesJSON
  .map(
    (state) =>
      new State(state.name, state.fipsCode, state.population, state.stateCode)
  )
  .sort((a, b) => (a.name < b.name ? -1 : 1));

const statesDB = new RegionDB(states);

export default statesDB;
