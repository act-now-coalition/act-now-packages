import { Region } from "./Region";

describe("Region", () => {
  test("toSlug", () => {
    expect(Region.toSlug("Río Grande")).toBe("rio_grande");
    expect(Region.toSlug("DeSoto County")).toBe("de_soto_county");
  });

  test("joinUrlPath", () => {
    expect(Region.urlJoin("/a")).toBe("/a");
    expect(Region.urlJoin("a")).toBe("a");
    expect(Region.urlJoin("/a/", "/b")).toBe("/a/b");
  });
});
