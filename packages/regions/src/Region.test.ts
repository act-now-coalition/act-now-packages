import { Region } from "./Region";

describe("Region", () => {
  test("toSlug", () => {
    expect(Region.toSlug("Río Grande")).toBe("rio_grande");
    expect(Region.toSlug("DeSoto County")).toBe("de_soto_county");
  });

  test("joinUrlPath", () => {
    expect(Region.urlPathJoin("/a")).toBe("/a");
    expect(Region.urlPathJoin("a")).toBe("a");
    expect(Region.urlPathJoin("a/")).toBe("a/");
    expect(Region.urlPathJoin("///a")).toBe("/a");
    expect(Region.urlPathJoin("///a/")).toBe("/a/");
    expect(Region.urlPathJoin("a///")).toBe("a/");
    expect(Region.urlPathJoin("/a", "/b//c/d/e/", "/f")).toBe("/a/b/c/d/e/f");
    expect(Region.urlPathJoin("a/", "/b/c/", "/d/")).toBe("a/b/c/d/");
  });
});
