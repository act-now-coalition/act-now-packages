import { Region, RegionJSON } from "./Region";

describe("Region", () => {
  test("toSlug", () => {
    expect(Region.toSlug("Río Grande")).toBe("rio_grande");
    expect(Region.toSlug("DeSoto County")).toBe("de_soto_county");
  });
});

describe("Region serialization", () => {
  const parentJSON: RegionJSON = {
    regionId: "12",
    fullName: "Florida",
    shortName: "Florida",
    abbreviation: "FL",
    urlFragment: "us/fl-florida",
    parent: null,
    population: 100_000,
  };

  const regionJSON: RegionJSON = {
    regionId: "12089",
    fullName: "Miami-Dade County, Florida",
    shortName: "Miami-Dade, FL",
    abbreviation: "Miami-Dade Co.",
    urlFragment: "us/fl-miami-dade",
    parent: parentJSON,
    population: 50_000,
  };
  const region = new Region(
    "12089",
    "Miami-Dade County, Florida",
    "Miami-Dade, FL",
    "Miami-Dade Co.",
    "us/fl-miami-dade",
    Region.fromJSON(parentJSON),
    50_000
  );

  test("toJSON", () => {
    expect(region.toJSON()).toStrictEqual(regionJSON);
  });
  test("fromJSON", () => {
    expect(Region.fromJSON(regionJSON)).toStrictEqual(region);
  });
});
