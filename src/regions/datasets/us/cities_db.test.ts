import { Region } from "../../Region";
import cities from "./cities_db";

describe("cities_db", () => {
  test("`all` includes all cities", () => {
    expect(cities.all).toHaveLength(100);
  });

  test("each city is correctly initialized", () => {
    cities.all.forEach((city) => {
      expect(city).toBeTruthy();
    });
  });

  test("findByRegionId", () => {
    expect(cities.findByRegionId("3502000")).toBeDefined(); // Albuquerque, NM
    expect(cities.findByRegionId("NO_CITY")).toBeNull();
  });

  test("findByRegionIdStrict", () => {
    expect(cities.findByRegionIdStrict("3502000")).toBeDefined();
    expect(cities.findByRegionIdStrict("3502000")).not.toBeNull();
    expect(() => cities.findByRegionIdStrict("NO_CITY")).toThrow();
  });

  test("all cities have a parent", () => {
    cities.all.forEach((city) => {
      expect(city.parent).not.toBeNull();
      expect(city.parent).toBeInstanceOf(Region);
    });
  });
});
