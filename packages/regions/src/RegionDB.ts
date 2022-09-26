import keyBy from "lodash/keyBy";
import { assert } from "@actnowcoalition/assert";
import { Region } from "./Region";

export interface RegionDBOptions {
  /** Customize the relativeUrl property of each region in this RegionDB */
  relativeUrl: (region: Region) => string;
}

const defaultOptions: RegionDBOptions = {
  relativeUrl: () => "",
};

export class RegionDB {
  private regionsById: { [regionId: string]: Region };

  constructor(private regions: Region[], private options?: RegionDBOptions) {
    const { relativeUrl } = { ...defaultOptions, ...options };

    // Reconstruct the region array using the provided options
    this.regions = regions.map((region) =>
      Region.fromJSON({
        ...region.toJSON(),
        relativeUrl: relativeUrl(region),
      })
    );

    this.regionsById = keyBy(this.regions, (region: Region) => region.regionId);
  }

  findByRegionId(regionId: string): Region | null {
    return this.regionsById[regionId] ?? null;
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
