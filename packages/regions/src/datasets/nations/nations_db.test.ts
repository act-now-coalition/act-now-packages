import nations from "./nations_db";

describe("nations_db", () => {
  const jsonIreland = {
    regionId: "IRL",
    fullName: "Ireland",
    shortName: "Ireland",
    abbreviation: "IRL",
    parent: null,
    slug: "ireland",
    relativeUrl: null,
    population: 4964440,
  };

  test("the number of nations is correct (234)", () => {
    expect(nations.all).toHaveLength(234);
  });

  test("each nation has valid properties", () => {
    nations.all.forEach((nation) => {
      expect(nation.fullName.length).toBeGreaterThan(0);
      expect(Number.isFinite(nation.population)).toBe(true);
      expect(nation.regionId.length).toBe(3);
    });
  });

  test("findByRegionIdStrict returns a country for valid ISO3 code", () => {
    const ireland = nations.findByRegionIdStrict("IRL");
    expect(ireland.toJSON()).toEqual(jsonIreland);
  });
});
