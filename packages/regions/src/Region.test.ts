import { Region } from "./Region";

describe("Region", () => {
  test("toSlug", () => {
    expect(Region.toSlug("Río Grande")).toBe("rio_grande");
    expect(Region.toSlug("DeSoto County")).toBe("de_soto_county");
  });
});
