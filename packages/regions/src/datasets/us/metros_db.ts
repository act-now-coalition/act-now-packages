import RegionDB from "../../RegionDB";
import { Region } from "../../Region";
import metrosJson from "./metros.json";
import statesDB from "./states_db";

const counties = metrosJson.map((metro) => {
  const metroUrlFragment = Region.toSlug(metro.name);
  const stateCodes = metro.stateCode.map((fips) => {
    return statesDB.findByRegionIdStrict(fips).abbreviation;
  });
  return new Region(
    metro.fipsCode,
    `${metro.name} metro area, ${stateCodes.join("-")}`,
    `${metro.name} metro}`,
    `${metro.name} metro}`,
    metroUrlFragment,
    null,
    metro.population
  );
});

const metrosDb = new RegionDB(counties);
export default metrosDb;
