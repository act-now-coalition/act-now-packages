import { states } from "@actnowcoalition/regions";

import { Metric } from "../Metric";
import { MetricCatalog } from "../MetricCatalog";
import { JsonDataProvider } from "./JsonDataProvider";
import { DataRow } from "./data_provider_utils";

const PROVIDER_ID = "test-json-provider";

const testJson = [
  {
    region: "36",
    cool_metric: 150,
  },
  {
    region: "12",
    cool_metric: null,
  },
];

const testJsonTimeseries = [
  {
    region: "36",
    date: "2022-08-02",
    cool_metric: 150,
  },
  {
    region: "36",
    date: "2022-08-03",
    cool_metric: null,
  },
  {
    region: "12",
    date: "2022-08-02",
    cool_metric: null,
  },
];

const newYork = states.findByRegionIdStrict("36");
const testMetric = new Metric({
  id: "metric",
  dataReference: { providerId: PROVIDER_ID, field: "cool_metric" },
});

/**
 * Create a JsonDataProvider from passed arguments and fetch data for test region and metric.
 *
 * @param data JSON data to be imported.
 * @param includeTimeseries Whether to include timeseries.
 * @param dateField Name of date field.
 * @param metric Metric to fetch data for.
 * @returns MetricData for test region and metric.
 */
const testFetchingJsonData = async (
  data: DataRow[],
  includeTimeseries: boolean,
  dateField?: string,
  metric?: Metric
) => {
  metric = metric ?? testMetric;
  const provider = new JsonDataProvider(PROVIDER_ID, {
    regionDb: states,
    regionField: "region",
    dateField: dateField,
    jsonData: data,
  });
  const catalog = new MetricCatalog([metric], [provider]);
  return (
    await provider.fetchData([newYork], [metric], includeTimeseries, catalog)
  )
    .regionData(newYork)
    .metricData(testMetric);
};

describe.only("JsonDataProvider", () => {
  test("fetchData() yields expected data", async () => {
    const metricDataNoTs = await testFetchingJsonData(
      testJson,
      /*includeTimeseries=*/ false
    );
    const metricDataTs = await testFetchingJsonData(
      testJsonTimeseries,
      /*includeTimeseries=*/ true,
      /*dateField=*/ "date"
    );
    expect(metricDataNoTs.currentValue).toBe(150);
    expect(metricDataNoTs.hasTimeseries()).toBe(false);

    expect(metricDataTs.hasTimeseries()).toBe(true);
    expect(metricDataTs.timeseries.length).toBe(1);
    expect(metricDataTs.timeseries.lastValue).toBe(150);
    expect(metricDataTs.currentValue).toBe(150);
  });

  test("fetchData() returns non-timeseries data if timeseries data is not available.", async () => {
    const metricData = await testFetchingJsonData(
      testJson,
      /*includeTimeseries=*/ true
    );
    expect(metricData.currentValue).toBe(150);
    expect(metricData.hasTimeseries()).toBe(false);
  });

  test("fetchData() fails if JSON does not have at least one row.", async () => {
    expect(async () =>
      testFetchingJsonData([], /*includeTimeseries=*/ true)
    ).rejects.toThrow("JSON array must not be empty.");
  });

  test("fetchData() fails if JSON does not have at least one valid region ID.", async () => {
    expect(async () =>
      testFetchingJsonData(
        [{ region: "New York", cool_metric: 150 }],
        /*includeTimeseries=*/ true
      )
    ).rejects.toThrow("Failed to parse data: All region IDs were invalid.");
  });

  test("fetchData() fails if metric is missing a 'field' property.", async () => {
    const badMetric = new Metric({
      id: "metric",
      dataReference: {
        providerId: PROVIDER_ID,
        /* missing field specifier. */
      },
    });
    expect(async () =>
      testFetchingJsonData(
        testJson,
        /*includeTimeseries=*/ true,
        /*dateField=*/ "date",
        badMetric
      )
    ).rejects.toThrow("Missing or invalid metric field name.");
  });

  test("Constructor fails if neither url or JSON data is provided.", () => {
    expect(() => {
      new JsonDataProvider("PROVIDER_ID", {
        regionDb: states,
        regionField: "region",
      });
    }).toThrow("URL or JSON data must be provided");
  });
});
