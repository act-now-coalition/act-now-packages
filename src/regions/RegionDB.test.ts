import { Region, RegionDB, states } from ".";

describe("RegionDB", () => {
  test("getRegionUrl returns the corresponding URL for the region", () => {
    const regionDB = new RegionDB(states.all, {
      getRegionUrl: (region: Region) => `/states/${region.slug}`,
    });
    const washingtonState = regionDB.findByRegionIdStrict("53");
    expect(regionDB.getRegionUrl(washingtonState)).toBe(
      `/states/${washingtonState.slug}`
    );
  });
});
