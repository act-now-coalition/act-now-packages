import { MockDataProvider } from "./MockDataProvider";
import { states } from "@actnowcoalition/regions";
import { Metric } from "../Metric/Metric";

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
    expect(data.timeseries.dates[0].toISOString()).toBe(
      "2022-01-01T00:00:00.000Z"
    );
    expect(data.timeseries.dates[4].toISOString()).toBe(
      "2022-01-05T00:00:00.000Z"
    );
  });
});
