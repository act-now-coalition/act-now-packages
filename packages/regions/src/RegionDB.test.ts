import { RegionDB } from "./RegionDB";
import { states, Region } from "./";

describe("RegionDB", () => {
  test("The relativeUrl option is applied", () => {
    const regions = new RegionDB(states.all);
    expect(regions.findByRegionIdStrict("53")?.relativeUrl).toBe("");

    const customizedRegions = new RegionDB(states.all, {
      relativeUrl: (region: Region) => `/states/${region.slug}`,
    });
    expect(customizedRegions.findByRegionIdStrict("53").relativeUrl).toBe(
      "/states/washington-wa"
    );
  });
});
