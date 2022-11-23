import { states } from "@actnowcoalition/regions";

import { MetricCatalog } from "./MetricCatalog";
import { SnapshotJSON } from "../data";
import { MockDataProvider, StaticValueDataProvider } from "../data_providers";

enum MetricId {
  PI = "pi",
  MOCK_CASES = "mock_cases",
}

enum ProviderId {
  STATIC = "static",
  MOCK = "mock",
}

// Note that data providers are stateful (they cache data, etc.) so we don't
// want to reuse them across tests. Hence this is a function that creates new
// ones each time.
function testDataProviders() {
  return [
    new StaticValueDataProvider(ProviderId.STATIC),
    new MockDataProvider(ProviderId.MOCK),
  ];
}

const testMetricDefs = [
  {
    id: MetricId.PI,
    name: "Pi",
    extendedName: "Pi - The ratio of a circle's circumference to its diameter",
    dataReference: {
      providerId: ProviderId.STATIC,
      value: 3.141592653589793,
    },
  },
  {
    id: MetricId.MOCK_CASES,
    name: "Cases Per 100k (mock)",
    extendedName: "Cases per 100k population (using mock data)",
    dataReference: {
      providerId: ProviderId.MOCK,
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
    const metricCatalog = new MetricCatalog(
      testMetricDefs,
      testDataProviders()
    );
    const piMetric = metricCatalog.getMetric(MetricId.PI);
    expect(piMetric.name).toStrictEqual("Pi");
    expect(() => {
      metricCatalog.getMetric("nothing");
    }).toThrow(`No metric found with id nothing`);
    expect(metricCatalog.getMetric(piMetric)).toBe(piMetric);
  });

  test("fetchData()", async () => {
    const catalog = new MetricCatalog(testMetricDefs, testDataProviders());

    const data = await catalog.fetchData(testRegionWA, MetricId.PI);
    expect(data.currentValue).toBe(Math.PI);

    const data2 = await catalog.fetchData(testRegionWA, MetricId.MOCK_CASES);
    const value = data2.currentValue;
    expect(typeof value).toBe("number");
  });

  test("fetchDataForMetricsAndRegions()", async () => {
    const catalog = new MetricCatalog(testMetricDefs, testDataProviders());

    // Fetch data for two metrics that come from different data providers.
    const dataStore = await catalog.fetchDataForRegionsAndMetrics(
      [testRegionCA, testRegionWA],
      [MetricId.PI, MetricId.MOCK_CASES]
    );

    // Ensure PI metric is correct.
    expect(
      dataStore.regionData(testRegionCA).metricData(MetricId.PI).currentValue
    ).toBe(Math.PI);
    expect(
      dataStore.regionData(testRegionWA).metricData(MetricId.PI).currentValue
    ).toBe(Math.PI);

    // Ensure mock cases metric is correct (note since mock data is random, we
    // don't know the exact value).
    const valueCA = dataStore
      .regionData(testRegionCA)
      .metricData(MetricId.MOCK_CASES).currentValue;
    expect(typeof valueCA).toBe("number");
    const valueWA = dataStore
      .regionData(testRegionWA)
      .metricData(MetricId.MOCK_CASES).currentValue;
    expect(typeof valueWA).toBe("number");
  });

  test("fetchData() correctly reads from a snapshot.", async () => {
    const catalog = new MetricCatalog(testMetricDefs, testDataProviders(), {
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
    const catalog = new MetricCatalog(testMetricDefs, testDataProviders(), {
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

  // See https://github.com/covid-projections/act-now-packages/issues/242 for context.
  test("fetchData() drops timeseries if it's not asked for.", async () => {
    // This test sets up a catalog with a MockDataProvider manually so that we
    // can directly call the MockDataProvider and ensure it always includes
    // timeseries data.
    const provider = new MockDataProvider(ProviderId.MOCK);
    const catalog = new MetricCatalog(
      [
        {
          id: MetricId.MOCK_CASES,
          dataReference: {
            providerId: ProviderId.MOCK,
          },
        },
      ],
      [provider]
    );
    const metric = catalog.getMetric(MetricId.MOCK_CASES);

    const providerData = await (
      await provider.fetchData(
        [testRegionCA],
        [metric],
        /*includeTimeseries=*/ false,
        catalog
      )
    ).metricData(testRegionCA, metric);
    const catalogData = await catalog.fetchData(
      testRegionCA,
      metric,
      /*includeTimeseries=*/ false
    );

    // The MockDataProvider always returns timeseries data, but the catalog should remove it.
    expect(providerData.hasTimeseries()).toBe(true);
    expect(catalogData.hasTimeseries()).toBe(false);
  });
});
