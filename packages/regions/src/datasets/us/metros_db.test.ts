import metrosDB from "./metros_db";

describe("states_db", () => {
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
    expect(metrosDB.findByRegionId("NO_STATE")).toBeNull();
  });

  test("findByRegionIdStrict", () => {
    console.log(metrosDB.findByRegionIdStrict("14460"));
    expect(metrosDB.findByRegionIdStrict("10420")).toBeDefined();
    expect(metrosDB.findByRegionIdStrict("10420")).not.toBeNull();
    expect(() => metrosDB.findByRegionIdStrict("NO_METRO")).toThrow();
  });
});
