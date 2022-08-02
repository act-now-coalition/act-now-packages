import statesJSON from "./states.json";
import { Region } from "../../Region";
import RegionDB from "../../RegionDB";

const states = statesJSON
  .map((state) => {
    const slugName = Region.toSlug(state.name);
    const slugStateCode = Region.toSlug(state.stateCode);
    return new Region(
      state.fipsCode,
      state.name,
      state.name,
      state.stateCode,
      `${slugName}-${slugStateCode}`,
      null,
      state.population
    );
  })
  .sort((a, b) => (a.fullName < b.fullName ? -1 : 1));

const statesDB = new RegionDB(states);

export default statesDB;
