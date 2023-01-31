import { states } from "../../regions";
import { Metric } from "../Metric";
import { MetricCatalog } from "../MetricCatalog";
import { CsvDataProvider } from "./CsvDataProvider";

const PROVIDER_ID = "csv-provider";

const mockCsv = `region,cool_metric
36,150
12,`;

const longCsv = `region,metric,Score
12,cool_metric,1.2
36,cool_metric,1.6
25,cool_metric,1.7`;

const csvTimeseries = `region,date,cool_metric
36,2022-08-02,150
36,2022-08-03,
12,2022-08-02,`;

const newYork = states.findByRegionIdStrict("36");
const testMetric = new Metric({
  id: "metric",
  dataReference: { providerId: PROVIDER_ID, column: "cool_metric" },
});

/**
 * Create a CsvDataProvider from passed arguments and fetch data for test region and metric.
 *
 * @param data CSV data to be imported.
 * @param includeTimeseries Whether to include timeseries.
 * @param dateCol Name of date column.
 * @returns MetricData for test region and metric.
 */
const testFetchingCsvData = async (
  data: string,
  includeTimeseries: boolean,
  dateCol?: string,
  metric?: Metric
) => {
  metric = metric ?? testMetric;
  const provider = new CsvDataProvider(PROVIDER_ID, {
    regionDb: states,
    regionColumn: "region",
    dateColumn: dateCol,
    csvText: data,
  });
  const catalog = new MetricCatalog([metric], [provider]);
  return (
    await provider.fetchData([newYork], [metric], includeTimeseries, catalog)
  )
    .regionData(newYork)
    .metricData(testMetric);
};

describe("CsvDataProvider", () => {
  test("fetchData() yields expected data", async () => {
    const metricDataNoTs = await testFetchingCsvData(
      mockCsv,
      /*includeTimeseries=*/ false
    );
    const metricDataTs = await testFetchingCsvData(
      csvTimeseries,
      /*includeTimeseries=*/ true,
      /*dateColumn=*/ "date"
    );
    expect(metricDataNoTs.currentValue).toBe(150);
    expect(metricDataNoTs.hasTimeseries()).toBe(false);

    expect(metricDataTs.hasTimeseries()).toBe(true);
    expect(metricDataTs.timeseries.length).toBe(1);
    expect(metricDataTs.timeseries.lastValue).toBe(150);
    expect(metricDataTs.currentValue).toBe(150);
  });

  test("fetchData() returns non-timeseries data if timeseries data is not available.", async () => {
    const metricData = await testFetchingCsvData(
      mockCsv,
      /*includeTimeseries=*/ true
    );
    expect(metricData.currentValue).toBe(150);
    expect(metricData.hasTimeseries()).toBe(false);
  });

  test("fetchData() fails if csv does not have at least one row.", async () => {
    expect(async () =>
      testFetchingCsvData(`region,cool_metric`, /*includeTimeseries=*/ true)
    ).rejects.toThrow("CSV must not be empty.");
  });

  test("fetchData() fails if csv does not have at least one valid region ID.", async () => {
    expect(async () =>
      testFetchingCsvData(
        `region,cool_metric\nNew York,1`,
        /*includeTimeseries=*/ true
      )
    ).rejects.toThrow("Failed to parse data: All region IDs were invalid.");
  });

  test("fetchData() fails if metric is missing a 'column' property.", async () => {
    const badMetric = new Metric({
      id: "metric",
      dataReference: {
        providerId: PROVIDER_ID,
        /* missing column specifier. */
      },
    });
    expect(async () =>
      testFetchingCsvData(
        mockCsv,
        /*includeTimeseries=*/ true,
        /*dateColumn=*/ "date",
        badMetric
      )
    ).rejects.toThrow("Missing or invalid metric column name.");
  });

  test("Constructor fails if neither url or csv data is provided.", () => {
    expect(() => {
      new CsvDataProvider("PROVIDER_ID", {
        regionDb: states,
        regionColumn: "region",
      });
    }).toThrow("URL or CSV data must be provided");
  });

  test("fetch long csv", async () => {
    const provider = new CsvDataProvider(PROVIDER_ID, {
      regionDb: states,
      regionColumn: "region",
      format: "long",
      csvText: longCsv,
    });

    // TODO: need to separate metric lookup from relying on metric id
    const metric = new Metric({
      id: "cool_metric",
      dataReference: {
        providerId: PROVIDER_ID,
        valueColumn: "Score",
        column: "metric",
      },
    });
    const data = await provider.fetchDataForRegionAndMetric(newYork, metric);
    console.log(data);
    expect(data).toBeDefined();
  });
});
