import RegionDB from "../../RegionDB";
import { Region } from "../../Region";
import nationsJSON from "./nations.json";

const nations = nationsJSON.map((country) => {
  return new Region(
    country.iso3_code,
    country.name,
    country.name,
    country.iso3_code,
    Region.toSlug(country.name),
    null,
    country.population
  );
});

const nationsDB = new RegionDB(nations);
export default nationsDB;
