import { assert } from "../../assert";
import { states } from "../../regions";
import { Metric } from "../Metric";
import { MockDataProvider } from "./MockDataProvider";

const testRegion = states.findByRegionIdStrict("53"); // Washington.

const PROVIDER_ID = "mock";

describe("MockDataProvider", () => {
  test("generates data", async () => {
    const dataProvider = new MockDataProvider(PROVIDER_ID);
    const metric = new Metric({
      id: "test",
      dataReference: {
        providerId: PROVIDER_ID,
        startDate: "2022-01-01",
        endDate: "2022-01-05",
      },
    });
    const data = await dataProvider.fetchDataForRegionAndMetric(
      testRegion,
      metric
    );
    expect(typeof data.currentValue).toBe("number");
    expect(data.currentValue).toBeGreaterThanOrEqual(0);
    expect(data.currentValue).toBeLessThanOrEqual(100);
    expect(data.timeseries.length).toBe(5);
    expect(data.timeseries.dates[0]).toEqual(new Date("2022-01-01"));
    expect(data.timeseries.dates[4]).toEqual(new Date("2022-01-05"));

    // Ensure we get back the same data if we ask again.
    const data2 = await dataProvider.fetchDataForRegionAndMetric(
      testRegion,
      metric
    );
    expect(data2).toBe(data);
  });

  test("uses default dates if omitted", async () => {
    const dataProvider = new MockDataProvider(PROVIDER_ID);
    const metric = new Metric({
      id: PROVIDER_ID,
      dataReference: {
        providerId: PROVIDER_ID,
      },
    });
    const data = await dataProvider.fetchDataForRegionAndMetric(
      testRegion,
      metric
    );
    assert(data.hasTimeseries);
    const dates = data.timeseries.dates;
    expect(dates[0]).toEqual(new Date("2022-01-01"));
    const today = new Date(new Date().toISOString().replace(/T.*/, ""));
    expect(dates[dates.length - 1]).toEqual(today);
  });
});
