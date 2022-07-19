import metrosDB from "./metros_db";

describe("metros_db", () => {
  test("`all` includes all metros", () => {
    expect(metrosDB.all).toHaveLength(392);
  });

  test("each metro is correctly initialized", () => {
    metrosDB.all.forEach((metro) => {
      expect(metro).toBeTruthy();
    });
  });

  test("findByRegionId", () => {
    expect(metrosDB.findByRegionId("10420")).toBeDefined();
    expect(metrosDB.findByRegionId("NO_METRO")).toBeNull();
  });

  test("findByRegionIdStrict", () => {
    expect(metrosDB.findByRegionIdStrict("10420")).toBeDefined();
    expect(metrosDB.findByRegionIdStrict("10420")).not.toBeNull();
    expect(() => metrosDB.findByRegionIdStrict("NO_METRO")).toThrow();
  });
});
