import { states } from "@actnowcoalition/regions";

import { MetricCatalog } from "./MetricCatalog";
import { SnapshotJSON } from "../data";
import { MockDataProvider, StaticValueDataProvider } from "../data_providers";

enum MetricId {
  PI = "pi",
  MOCK_CASES = "mock_cases",
}

const testMetricDefs = [
  {
    id: MetricId.PI,
    name: "Pi",
    extendedName: "Pi - The ratio of a circle's circumference to its diameter",
    dataReference: {
      providerId: "static-value",
      value: 3.141592653589793,
    },
  },
  {
    id: MetricId.MOCK_CASES,
    name: "Cases Per 100k (mock)",
    extendedName: "Cases per 100k population (using mock data)",
    dataReference: {
      providerId: "mock",
      startDate: "2020-01-01",
    },
  },
];

const testRegionWA = states.findByRegionIdStrict("53"); // Washington.
const testRegionCA = states.findByRegionIdStrict("06"); // California

/**
 * Test snapshot with data for PI metric for California.
 * NOTE: We set the PI metric to 3 instead of 3.1415... so that we can easily
 * identify if the data comes from the snapshot or not.
 */
const testSnapshot: SnapshotJSON = {
  metadata: { createdDate: "2022-08-04", latestDate: "2022-08-04" },
  data: {
    "06": {
      pi: {
        currentValue: 3,
        timeseriesPoints: [{ date: "2022-08-04", value: 3 }],
      },
    },
  },
};

describe("MetricCatalog", () => {
  test("getMetric()", () => {
    const dataProviders = [
      new StaticValueDataProvider(),
      new MockDataProvider(),
    ];
    const metricCatalog = new MetricCatalog(testMetricDefs, dataProviders);
    expect(metricCatalog.getMetric(MetricId.PI).name).toStrictEqual("Pi");
    expect(() => {
      metricCatalog.getMetric("nothing");
    }).toThrow(`No metric found with id nothing`);
  });

  test("fetchData()", async () => {
    const dataProviders = [
      new StaticValueDataProvider(),
      new MockDataProvider(),
    ];
    const catalog = new MetricCatalog(testMetricDefs, dataProviders);

    const data = await catalog.fetchData(testRegionWA, MetricId.PI);
    expect(data.currentValue).toBe(Math.PI);

    const data2 = await catalog.fetchData(testRegionWA, MetricId.MOCK_CASES);
    const value = data2.currentValue;
    expect(typeof value).toBe("number");
  });

  test("fetchDataForMetricsAndRegions()", async () => {
    const dataProviders = [
      new StaticValueDataProvider(),
      new MockDataProvider(),
    ];
    const catalog = new MetricCatalog(testMetricDefs, dataProviders);

    const dataStore = await catalog.fetchDataForMetricsAndRegions(
      [testRegionCA, testRegionWA],
      [MetricId.PI, MetricId.MOCK_CASES]
    );

    expect(
      dataStore.regionData(testRegionCA).metricData(MetricId.PI).currentValue
    ).toBe(Math.PI);
    expect(
      dataStore.regionData(testRegionWA).metricData(MetricId.PI).currentValue
    ).toBe(Math.PI);

    const valueCA = dataStore
      .regionData(testRegionCA)
      .metricData(MetricId.MOCK_CASES).currentValue;
    const valueWA = dataStore
      .regionData(testRegionWA)
      .metricData(MetricId.MOCK_CASES).currentValue;
    expect(typeof valueCA).toBe("number");
    expect(typeof valueWA).toBe("number");
  });

  test("fetchData() correctly reads from a snapshot.", async () => {
    const dataProviders = [
      new StaticValueDataProvider(),
      new MockDataProvider(),
    ];
    const catalog = new MetricCatalog(testMetricDefs, dataProviders, {
      snapshot: testSnapshot,
    });

    const data = await catalog.fetchData(
      testRegionCA,
      catalog.getMetric(MetricId.PI),
      /*includeTimeseries=*/ true
    );
    expect(data.currentValue).toStrictEqual(3);
    expect(data.timeseries.dates).toStrictEqual([new Date("2022-08-04")]);
    expect(data.timeseries.values).toStrictEqual([3]);
  });

  test("fetchData() falls back to data providers if snapshot doesn't have data", async () => {
    const dataProviders = [
      new StaticValueDataProvider(),
      new MockDataProvider(),
    ];
    const catalog = new MetricCatalog(testMetricDefs, dataProviders, {
      snapshot: testSnapshot,
    });

    const data = await catalog.fetchData(
      testRegionCA,
      catalog.getMetric(MetricId.MOCK_CASES),
      /*includeTimeseries=*/ true
    );
    expect(typeof data.currentValue).toEqual("number");
    expect(data.timeseries.hasData()).toEqual(true);
  });
});
