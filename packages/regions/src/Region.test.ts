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
    slug: "florida-fl",
    parent: null,
    population: 21_477_737,
  };

  const regionJSON: RegionJSON = {
    regionId: "12089",
    fullName: "Miami-Dade County, Florida",
    shortName: "Miami-Dade County, FL",
    abbreviation: "Miami-Dade Co.",
    slug: "miami_dade_co",
    parent: parentJSON,
    population: 2_716_940,
  };
  const region = new Region(
    "12089",
    "Miami-Dade County, Florida",
    "Miami-Dade County, FL",
    "Miami-Dade Co.",
    "miami_dade_co",
    Region.fromJSON(parentJSON),
    2_716_940
  );

  test("toJSON", () => {
    expect(region.toJSON()).toStrictEqual(regionJSON);
  });
  test("fromJSON", () => {
    expect(Region.fromJSON(regionJSON)).toStrictEqual(region);
  });
});
