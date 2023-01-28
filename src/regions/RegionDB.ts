import keyBy from "lodash/keyBy";
import { assert } from "src/assert";

import { Region } from "./Region";

export interface RegionDBOptions {
  /** Function to return the URL associated with the given region */
  getRegionUrl?: (region: Region) => string;
}

export class RegionDB {
  private regionsById: { [regionId: string]: Region };

  constructor(
    private regions: Region[],
    public readonly options?: RegionDBOptions
  ) {
    this.regionsById = keyBy(regions, (region: Region) => region.regionId);
  }

  findByRegionId(regionId: string): Region | null {
    return this.regionsById[regionId] ?? null;
  }

  findByRegionIdStrict(regionId: string): Region {
    const region = this.findByRegionId(regionId);
    assert(region, `Region unexpectedly not found for ${regionId}`);
    return region;
  }

  getRegionUrl(region: Region) {
    assert(
      this?.options?.getRegionUrl,
      `This RegionDB doesn't have a getRegionUrl configured`
    );
    return this?.options.getRegionUrl(region);
  }

  get all(): Region[] {
    return this.regions;
  }
}

export default RegionDB;
