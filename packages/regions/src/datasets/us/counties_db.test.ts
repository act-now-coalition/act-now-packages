import countiesDB from "./counties_db";

describe("counties_db", () => {
  test("`all` includes all counties", () => {
    expect(countiesDB.all).toHaveLength(3224);
  });

  test("each county is correctly initialized", () => {
    countiesDB.all.forEach((county) => {
      expect(county).toBeTruthy();
    });
  });

  test("findRegionById", () => {
    expect(countiesDB.findByRegionId("53033")).toBeDefined();
    expect(countiesDB.findByRegionId("NO_COUNTY")).toBeNull();
  });

  test("findRegionByIdStrict", () => {
    expect(countiesDB.findByRegionIdStrict("53033")).toBeDefined();
    expect(countiesDB.findByRegionIdStrict("53033")).not.toBeNull();
    expect(() => countiesDB.findByRegionIdStrict("NO_COUNTY")).toThrow();
  });
});
