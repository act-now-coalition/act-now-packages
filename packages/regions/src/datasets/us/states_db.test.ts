import statesDB from "./states_db";

describe("States DB", () => {
  test("number of states", () => {
    expect(statesDB.all).toHaveLength(53);
    expect(statesDB.findByRegionId("06")).toBeDefined();
    expect(statesDB.findByRegionIdStrict("06").relativeUrl).toBe(
      "/us/california-ca"
    );
  });
});
