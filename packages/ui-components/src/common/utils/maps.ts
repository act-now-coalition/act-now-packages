import { RegionDB, Region } from "@actnowcoalition/regions";

/** Checks if a county or congressional district belongs to a given state */
export function belongsToState(
  countyOrCongressionalDistrictRegionId: string,
  stateRegionId: string
): boolean {
  return (
    countyOrCongressionalDistrictRegionId.substring(0, 2) === stateRegionId
  );
}

/** Returns an array of all counties of a given state */
export function getCountiesOfState(
  regionDB: RegionDB,
  stateRegionId: string
): Region[] {
  return regionDB.all.filter(
    (county) => county.parent?.regionId === stateRegionId
  );
}
