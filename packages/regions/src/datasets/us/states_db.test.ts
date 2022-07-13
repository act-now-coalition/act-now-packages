import statesDB from "./states_db";

describe("states_db", () => {
  test("`all` includes all states", () => {
    expect(statesDB.all).toHaveLength(53);
  });

  test("each state is correctly initialized", () => {
    statesDB.all.forEach((state) => {
      expect(state).toBeTruthy();
    });
  });

  test("findByRegionId", () => {
    expect(statesDB.findByRegionId("53")).toBeDefined();
    expect(statesDB.findByRegionId("NO_STATE")).toBeNull();
  });

  test("findByRegionIdStrict", () => {
    expect(statesDB.findByRegionIdStrict("53")).toBeDefined();
    expect(statesDB.findByRegionIdStrict("53")).not.toBeNull();
    expect(() => statesDB.findByRegionIdStrict("53")).not.toThrow();
    expect(() => statesDB.findByRegionIdStrict("NO_STATE")).toThrow();
  });
});
