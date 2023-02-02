import { states } from "../../regions";
import { Metric } from "../Metric";
import { MetricCatalog } from "../MetricCatalog";
import { CsvDataProvider, LongFormatCsvOptions } from "./CsvDataProvider";

const PROVIDER_ID = "csv-provider";

const wideCsv = `region,cool_metric,another_metric
12,,100
36,120,200`;

const wideCsvTimeseries = `region,date,cool_metric,another_metric
36,2022-08-02,120,200
36,2022-08-03,,210
12,2022-08-02,,100`;

const longCsv = `region,variable,value
36,another_metric,200
12,another_metric,100
36,cool_metric,120`;

const longCsvTimeseries = `region,date,variable,value
36,2022-08-02,cool_metric,120
36,2022-08-02,another_metric,200
36,2022-08-03,another_metric,210
12,2022-08-02,another_metric,100`;

const newYork = states.findByRegionIdStrict("36");
const testWideMetric = new Metric({
  id: "metric",
  dataReference: { providerId: PROVIDER_ID, column: "cool_metric" },
});
const testLongMetric = new Metric({
  id: "metric",
  dataReference: { providerId: PROVIDER_ID, variable: "cool_metric" },
});
const longFormatCsvProviderOptions = {
  variableColumn: "variable",
  valueColumn: "value",
};

/**
 * Create a CsvDataProvider from passed arguments and fetch data for test region and metric.
 *
 * @param data CSV data to be imported.
 * @param includeTimeseries Whether to include timeseries.
 * @param dateCol Name of date column.
 * @param metric Metric to fetch data for. Defaults to testWideMetric.
 * @param longFormatCsvOptions options for long-format CsvDataProviders.
 * @returns MetricData for test region and metric.
 */
const testFetchingCsvData = async (
  data: string,
  includeTimeseries: boolean,
  dateCol?: string,
  metric?: Metric,
  longFormatCsvOptions?: LongFormatCsvOptions
) => {
  metric = metric ?? testWideMetric;
  const provider = new CsvDataProvider(PROVIDER_ID, {
    regionDb: states,
    regionColumn: "region",
    dateColumn: dateCol,
    csvText: data,
    longFormatCsvOptions,
  });
  const catalog = new MetricCatalog([metric], [provider]);
  return (
    await provider.fetchData([newYork], [metric], includeTimeseries, catalog)
  )
    .regionData(newYork)
    .metricData(testWideMetric);
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

  test("Wide- and long-format CSVs create the same MetricData", async () => {
    const wideMetricData = await testFetchingCsvData(
      wideCsv,
      /*includeTimeseries=*/ false
    );
    const longMetricData = await testFetchingCsvData(
      longCsv,
      /*includeTimeseries=*/ false,
      /*dateColumn=*/ undefined,
      testLongMetric,
      longFormatCsvProviderOptions
    );
    const wideMetricDataTs = await testFetchingCsvData(
      wideCsvTimeseries,
      /*includeTimeseries=*/ true,
      /*dateColumn=*/ "date"
    );
    const longMetricDataTs = await testFetchingCsvData(
      longCsvTimeseries,
      /*includeTimeseries=*/ true,
      /*dateColumn=*/ "date",
      testLongMetric,
      longFormatCsvProviderOptions
    );

    expect(wideMetricData).toStrictEqual(longMetricData);
    expect(wideMetricDataTs).toStrictEqual(longMetricDataTs);
  });
});

describe("CsvDataProvider with wide-format (default) csv", () => {
  test("fetchData() yields expected data", async () => {
    const metricDataNoTs = await testFetchingCsvData(
      wideCsv,
      /*includeTimeseries=*/ false
    );
    const metricDataTs = await testFetchingCsvData(
      wideCsvTimeseries,
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
      wideCsv,
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
        wideCsv,
        /*includeTimeseries=*/ true,
        /*dateColumn=*/ "date",
        badMetric
      )
    ).rejects.toThrow("Missing or invalid metric column name.");
  });
});

describe.only("CsvDataProvider with long-format CSV", () => {
  test("fetchData() yields expected data", async () => {
    const metricDataNoTs = await testFetchingCsvData(
      longCsv,
      /*includeTimeseries=*/ false,
      /*dateColumn=*/ undefined,
      /*metric=*/ testLongMetric,
      longFormatCsvProviderOptions
    );
    const metricDataTs = await testFetchingCsvData(
      longCsvTimeseries,
      /*includeTimeseries=*/ true,
      /*dateColumn=*/ "date",
      /*metric=*/ testLongMetric,
      longFormatCsvProviderOptions
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
      /*metric=*/ testLongMetric,
      longFormatCsvProviderOptions
    );
    expect(metricData.currentValue).toBe(120);
    expect(metricData.hasTimeseries()).toBe(false);
  });

  test("fetchData() fails if dateColumn is provided for non-timeseries data.", async () => {
    expect(async () =>
      testFetchingCsvData(
        longCsv,
        /*includeTimeseries=*/ false,
        /*dateColumn=*/ "date",
        /*metric=*/ testLongMetric,
        longFormatCsvProviderOptions
      )
    ).rejects.toThrow();
  });

  // test("fetchData() fails if no data exists for the region", async () => {
  //   expect(async () =>
  //     testFetchingCsvData(
  //       longCsv.replaceAll("36", "25"), // replace NY locations with MA so there's no data for NY.
  //       /*includeTimeseries=*/ true,
  //       /*dateColumn=*/ undefined,
  //       /*metric=*/ testLongMetric,
  //       longFormatCsvProviderOptions
  //     )
  //   ).rejects.toThrow("No data found for region");
  // });
});
