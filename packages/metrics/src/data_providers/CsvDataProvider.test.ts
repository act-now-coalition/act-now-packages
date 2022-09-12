import { CsvDataProvider } from "./CsvDataProvider";
import { Metric } from "../Metric";
import { states } from "@actnowcoalition/regions";

const mockCsv = `region,cool_metric
36,150
12,`;

const csvTimeseries = `region,date,cool_metric
36,2022-08-02,150
12,2022-08-02,`;

const newYork = states.findByRegionIdStrict("36");
const testMetric = new Metric({
  id: "metric",
  dataReference: { providerId: "csv-provider", column: "cool_metric" },
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
  dateCol?: string
) => {
  const provider = new CsvDataProvider("csv-provider", {
    regionColumn: "region",
    dateColumn: dateCol,
    csvText: data,
  });
  return (await provider.fetchData([newYork], [testMetric], includeTimeseries))
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
    expect(metricDataTs.currentValue).toBe(150);
    expect(metricDataTs.timeseries.lastValue).toBe(150);
  });

  test("populateCache() fails if csv does not have at least one row.", async () => {
    const provider = new CsvDataProvider("csv-provider", {
      regionColumn: "region",
      csvText: `region,cool_metric`,
    });
    expect(async () => {
      await provider.populateCache();
    }).rejects.toThrow("CSV must not be empty.");
  });

  test("Constructor fails if neither url or csv data is provided.", () => {
    expect(() => {
      new CsvDataProvider("csv-provider", {
        regionColumn: "region",
      });
    }).toThrow("URL or CSV data must be provided");
  });
});
