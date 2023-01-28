import { Region, RegionDB } from "src/regions";

export interface BaseMapProps {
  /**
   * Function that returns tooltip content for the region corresponding to a given regionId.
   *
   * @param regionId - RegionId of the region for which to get tooltip content.
   * @returns Tooltip content for the region.
   */
  getTooltip: (regionId: string) => React.ReactNode;
  /**
   * Function that returns the fill color for a region's shape, given the region's regionId.
   *
   * @param regionId - RegionId of the region for which to get the fill color.
   * @returns Fill color for the region.
   */
  getFillColor?: (regionId: string) => string;
  /**
   * Function that returns the `regionUrl` for the region corresponding to a given regionId.
   * @default undefined
   *
   * @param regionId - RegionId of the region for which to get the regionUrl.
   * @returns Region URL for the region.
   */
  getRegionUrl?: (regionId: string) => string | undefined;
  /**
   * Width of the SVG containing the map.
   */
  width?: number;
}

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
