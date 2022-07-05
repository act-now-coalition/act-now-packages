import countiesDB from "./counties_db";
import { County } from "./County";
import { State } from "./State";

const counties = countiesDB.all as County[];

describe("counties_db", () => {
  test("`all` includes all counties", () => {
    expect(counties).toHaveLength(3224);
  });

  test("each county is correctly initialized", () => {
    counties.forEach((county) => {
      expect(county).toBeTruthy();
      expect(county instanceof County).toBe(true);
      expect(county.state instanceof State).toBe(true);
    });
  });

  test("findRegionById", () => {
    expect(countiesDB.findByRegionId("53033")).toBeDefined();
    expect(countiesDB.findByRegionId("NO_COUNTY")).toBeNull();
  });

  test("findRegionByIdStrict", () => {
    expect(() => countiesDB.findByRegionIdStrict("53033")).not.toThrow();
    expect(() => countiesDB.findByRegionIdStrict("NO_COUNTY")).toThrow();
  });
});
