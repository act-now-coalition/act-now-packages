import { Region } from "../../Region";
import RegionDB from "../../RegionDB";
import metrosJson from "./metros.json";
import statesDB from "./states_db";

const metros = metrosJson.map((metro) => {
  const metroUrlFragment = Region.toSlug(metro.name);
  const stateAbbrevs = metro.stateCode.map((fips) => {
    return statesDB.findByRegionIdStrict(fips).abbreviation;
  });
  return new Region(
    metro.fipsCode,
    `${metro.name} metro area, ${stateAbbrevs.join("-")}`,
    `${metro.name} metro`,
    `${metro.name} metro`,
    metroUrlFragment,
    null, // parent
    metro.population
  );
});

const metrosDb = new RegionDB(metros);
export default metrosDb;
