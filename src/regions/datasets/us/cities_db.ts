import { Region } from "../../Region";
import RegionDB from "../../RegionDB";
import citiesJson from "./cities.json";
import statesDB from "./states_db";

const metros = citiesJson.map((city) => {
  return new Region(
    city.regionId.split("US")[1],
    city.fullName,
    city.shortName,
    city.abbreviation,
    Region.toSlug(city.fullName),
    statesDB.all.find((state) => state.abbreviation === city.state) ?? null, // should never be null
    city.population
  );
});

const citiesDb = new RegionDB(metros);
export default citiesDb;
