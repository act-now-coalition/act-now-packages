import { states } from "../../regions";
import { Metric } from "../Metric";
import { MetricCatalog } from "../MetricCatalog";
import { CsvDataProvider, CsvDataProviderOptions } from "./CsvDataProvider";

const PROVIDER_ID = "csv-provider";

const mockCsv = `region,cool_metric
36,150
12,`;

const csvTimeseries = `region,date,cool_metric
36,2022-08-02,150
36,2022-08-03,
12,2022-08-02,`;

const longCsv = `region,metric,value,another_column
12,cool_metric,100,a
12,another_metric,110,b
36,cool_metric,120,d
36,another_metric,130,c`;

const longCsvTimeseries = `region,date,metric,value,another_column
12,2022-08-02,cool_metric,70,a
12,2022-08-02,another_metric,80,b
36,2022-08-02,cool_metric,90,d
36,2022-08-02,another_metric,100,c
36,2022-08-03,cool_metric,120,d
36,2022-08-03,another_metric,130,c`;

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
 * @param metric Metric to fetch data for. Defaults to testMetric.
 * @param otherProviderArgs Other arguments to pass to CsvDataProvider constructor.
 * @returns MetricData for test region and metric.
 */
const testFetchingCsvData = async (
  data: string,
  includeTimeseries: boolean,
  dateCol?: string,
  metric?: Metric,
  otherProviderArgs?: Partial<CsvDataProviderOptions>
) => {
  metric = metric ?? testMetric;
  const provider = new CsvDataProvider(PROVIDER_ID, {
    regionDb: states,
    regionColumn: "region",
    dateColumn: dateCol,
    csvText: data,
    ...otherProviderArgs,
  });
  const catalog = new MetricCatalog([metric], [provider]);
  return (
    await provider.fetchData([newYork], [metric], includeTimeseries, catalog)
  )
    .regionData(newYork)
    .metricData(testMetric);
};

describe("CsvDataProvider", () => {
  test("Constructor fails if neither url or csv data is provided.", () => {
    expect(() => {
      new CsvDataProvider("PROVIDER_ID", {
        regionDb: states,
        regionColumn: "region",
      });
    }).toThrow("URL or CSV data must be provided");
  });

  test("fetchData() fails if csv does not have at least one valid region ID.", async () => {
    expect(async () =>
      testFetchingCsvData(
        `region,cool_metric\nNew York,1`,
        /*includeTimeseries=*/ true
      )
    ).rejects.toThrow("Failed to parse data: All region IDs were invalid.");
  });

  test("fetchData() fails if csv does not have at least one row.", async () => {
    expect(async () =>
      testFetchingCsvData(`region,cool_metric`, /*includeTimeseries=*/ true)
    ).rejects.toThrow("CSV must not be empty.");
  });
});

describe("CsvDataProvider with wide-format (default) csv", () => {
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
});

describe("CsvDataProvider with long-format CSV", () => {
  const longCsvProviderOptions: Partial<CsvDataProviderOptions> = {
    format: "long",
    longDataMetricColumn: "metric",
    longDataValueColumn: "value",
  };

  test("fetchData() yields expected data", async () => {
    const metricDataNoTs = await testFetchingCsvData(
      longCsv,
      /*includeTimeseries=*/ false,
      /*dateColumn=*/ undefined,
      /*metric=*/ undefined,
      longCsvProviderOptions
    );
    const metricDataTs = await testFetchingCsvData(
      longCsvTimeseries,
      /*includeTimeseries=*/ true,
      /*dateColumn=*/ "date",
      /*metric=*/ undefined,
      longCsvProviderOptions
    );
    expect(metricDataNoTs.currentValue).toBe(120);
    expect(metricDataNoTs.hasTimeseries()).toBe(false);

    expect(metricDataTs.hasTimeseries()).toBe(true);
    expect(metricDataTs.timeseries.length).toBe(2);
    expect(metricDataTs.timeseries.lastValue).toBe(120);
    expect(metricDataTs.currentValue).toBe(120);
  });

  test("fetchData() returns non-timeseries data if timeseries data is not available.", async () => {
    const metricData = await testFetchingCsvData(
      longCsv,
      /*includeTimeseries=*/ true,
      /*dateColumn=*/ undefined,
      /*metric=*/ undefined,
      longCsvProviderOptions
    );
    expect(metricData.currentValue).toBe(120);
    expect(metricData.hasTimeseries()).toBe(false);
  });

  test("fetchData() fails if no data exists for the region", async () => {
    expect(async () =>
      testFetchingCsvData(
        longCsv.replaceAll("36", "25"), // replace NY locations with MA so there's no data for NY.
        /*includeTimeseries=*/ true,
        /*dateColumn=*/ undefined,
        /*metric=*/ undefined,
        longCsvProviderOptions
      )
    ).rejects.toThrow("No data found for region");
  });

  test("fetchData() fails if dateColumn is provided for non-timeseries data.", async () => {
    expect(async () =>
      testFetchingCsvData(
        longCsv,
        /*includeTimeseries=*/ false,
        /*dateColumn=*/ "date",
        /*metric=*/ undefined,
        longCsvProviderOptions
      )
    ).rejects.toThrow("Missing date field");
  });
});
