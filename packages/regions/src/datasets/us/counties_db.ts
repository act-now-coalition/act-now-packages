import RegionDB from "../../RegionDB";
import { Region } from "../../Region";
import countiesJSON from "./counties.json";
import statesDB from "./states_db";

const counties = countiesJSON.map((county) => {
  const state = statesDB.findByRegionIdStrict(county.stateFipsCode);
  const countyAbbreviation = getAbbreviatedCounty(county.name);
  const countyUrlFragment = Region.toSlug(countyAbbreviation);
  return new Region(
    county.fipsCode,
    `${county.name}, ${state.fullName}`,
    `${county.name}, ${state.abbreviation}`,
    countyAbbreviation,
    countyUrlFragment,
    state,
    county.population
  );
});

const countiesDB = new RegionDB(counties);
export default countiesDB;

/**
 * Shortens the county name by using the abbreviated version of 'county'
 * or the equivalent administrative division.
 */
function getAbbreviatedCounty(fullCountyName: string) {
  if (fullCountyName.includes("Parish"))
    return fullCountyName.replace("Parish", "Par.");
  if (fullCountyName.includes("Borough"))
    return fullCountyName.replace("Borough", "Bor.");
  if (fullCountyName.includes("Census Area"))
    return fullCountyName.replace("Census Area", "C.A.");
  if (fullCountyName.includes("Municipality"))
    return fullCountyName.replace("Municipality", "Mun.");
  if (fullCountyName.includes("Municipio"))
    return fullCountyName.replace("Municipio", "Mun.");
  else return fullCountyName.replace("County", "Co.");
}
