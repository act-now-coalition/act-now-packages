import { assert } from "@actnowcoalition/assert";
import { states } from "@actnowcoalition/regions";

import { MockDataProvider } from "./MockDataProvider";
import { Metric } from "../Metric";

const testRegion = states.findByRegionIdStrict("53"); // Washington.

describe("MockDataProvider", () => {
  test("generates data", () => {
    const dataProvider = new MockDataProvider();
    const metric = new Metric({
      id: "test",
      dataReference: {
        providerId: "mock",
        startDate: "2022-01-01",
        endDate: "2022-01-05",
      },
    });
    const data = dataProvider.getDataFromCache(
      testRegion,
      metric,
      /*includeTimeseries=*/ true
    );
    expect(typeof data.currentValue).toBe("number");
    expect(data.currentValue).toBeGreaterThanOrEqual(0);
    expect(data.currentValue).toBeLessThanOrEqual(100);
    expect(data.timeseries.length).toBe(5);
    expect(data.timeseries.dates[0]).toEqual(new Date("2022-01-01"));
    expect(data.timeseries.dates[4]).toEqual(new Date("2022-01-05"));

    // Ensure we get back the same data if we ask again.
    const data2 = dataProvider.getDataFromCache(
      testRegion,
      metric,
      /*includeTimeseries=*/ true
    );
    expect(data2).toBe(data);
  });

  test("generates data with includeTimeseries=false", () => {
    const dataProvider = new MockDataProvider();
    const metric = new Metric({
      id: "test",
      dataReference: {
        providerId: "mock",
      },
    });
    const data = dataProvider.getDataFromCache(
      testRegion,
      metric,
      /*includeTimeseries=*/ false
    );
    expect(typeof data.currentValue).toBe("number");
    expect(data.currentValue).toBeGreaterThanOrEqual(0);
    expect(data.currentValue).toBeLessThanOrEqual(100);

    // Ensure we get back the same data if we ask again.
    const data2 = dataProvider.getDataFromCache(
      testRegion,
      metric,
      /*includeTimeseries=*/ false
    );
    expect(data2).toBe(data);
  });

  test("uses default dates if omitted", () => {
    const dataProvider = new MockDataProvider();
    const metric = new Metric({
      id: "test",
      dataReference: {
        providerId: "mock",
      },
    });
    const data = dataProvider.getDataFromCache(
      testRegion,
      metric,
      /*includeTimeseries=*/ true
    );
    assert(data.hasTimeseries);
    const dates = data.timeseries.dates;
    expect(dates[0]).toEqual(new Date("2022-01-01"));
    const today = new Date(new Date().toISOString().replace(/T.*/, ""));
    expect(dates[dates.length - 1]).toEqual(today);
  });
});
