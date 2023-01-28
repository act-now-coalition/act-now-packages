import { Region } from "../../Region";
import RegionDB from "../../RegionDB";
import nationsJSON from "./nations.json";

const nations = nationsJSON.map((country) => {
  return new Region(
    /*regionId=*/ country.iso3_code,
    /*fullName=*/ country.name,
    /*shortName=*/ country.name,
    /*abbreviation=*/ country.iso3_code,
    /*slug=*/ Region.toSlug(country.name),
    /*parent=*/ null,
    /*population=*/ country.population
  );
});

const nationsDB = new RegionDB(nations);
export default nationsDB;
