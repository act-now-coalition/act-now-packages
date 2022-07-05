import keyBy from "lodash/keyBy";
import { assert } from "@actnowcoalition/assert";
import { Region } from "./Region";

export class RegionDB {
  private regionsById: { [regionId: string]: Region };

  constructor(public readonly regions: Region[]) {
    this.regionsById = keyBy(regions, (region: Region) => region.regionId);
  }

  findByRegionId(regionId: string): Region | null {
    return this.regionsById[regionId] || null;
  }

  findByRegionIdStrict(regionId: string): Region {
    const region = this.findByRegionId(regionId);
    assert(region, `Region unexpectedly not found for ${regionId}`);
    return region;
  }

  get all(): Region[] {
    return this.regions;
  }
}

export default RegionDB;
