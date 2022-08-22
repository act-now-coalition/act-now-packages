import { assert } from "@actnowcoalition/assert";
import { Region } from "@actnowcoalition/regions";
import { CachingMetricDataProviderBase } from "./CachingMetricDataProviderBase";
import { Metric } from "../Metric";
import { MetricData } from "../data";
import { DataRow, dataRowsToMetricData } from "./data_provider_utils";
import { Dictionary, groupBy } from "lodash";
import Papa from "papaparse";

interface CsvDataProviderOptions {
  /** URL of a CSV file to import from. */
  url?: string;
  /** Name of column containing valid Region IDs. */
  regionColumn: string;
  /** Name of column containing valid ISO 8601 date-time values.
   * dateColumn must be provided if the CSV contains timeseries data, even if
   * timeseries data will not be used (e.g. by setting includeTimeseries=false) */
  dateColumn?: string;
  /** CSV data to import in place of URL fetch, typically used for testing. */
  csvData?: string;
}

/**
 * Data Provider for importing data from wide-format CSV files.
 *
 * Assumes data is in wide form (variables as columns, indexed by region and date columns.)
 * E.g:
 * |region |date       |var1 |var2 |
 * |TX     |2022-02-01 |12   |45   |
 * |CA     |2022-02-01 |31   |66   |
 */
export class CsvDataProvider extends CachingMetricDataProviderBase {
  private readonly regionColumn: string;
  private readonly dateColumn?: string;
  private readonly url?: string;
  private readonly csvData?: string;

  private cachedData: Dictionary<DataRow[]> = {};

  constructor(providerId: string, options: CsvDataProviderOptions) {
    assert(
      options.url || options.csvData,
      "Either a URL or CSV data must be provided to create an instance of CsvDataProvider."
    );
    super(providerId);
    this.regionColumn = options.regionColumn;
    this.dateColumn = options.dateColumn;
    this.url = options.url;
    this.csvData = options.csvData;
  }

  async populateCache(): Promise<void> {
    const csv = await fetchCsv(this.url, this.csvData);
    assert(csv.length > 0, "CSV must not be empty.");
    assert(
      csv.every((row) => row[this.regionColumn] !== undefined),
      "CSV must contain a region column entry for all rows."
    );
    const dataRowsByRegionId = groupBy(csv, (row) => row[this.regionColumn]);
    this.cachedData = dataRowsByRegionId;
  }

  getDataFromCache(
    region: Region,
    metric: Metric,
    includeTimeseries: boolean
  ): MetricData<unknown> {
    const metricData = dataRowsToMetricData(
      this.cachedData,
      region,
      metric,
      includeTimeseries,
      this.dateColumn
    );
    if (includeTimeseries) {
      assert(
        metricData.hasTimeseries(),
        "includeTimeseries set to true but cached data has no timeseries."
      );
      return metricData;
    }
    return metricData.dropTimeseries();
  }
}

/**
 * Fetches data from a URL or CSV data and parses it as JSON.
 *
 * At least one of url and csvData must be provided.
 * If both url and csvData are provided data is fetched from the url and csvData is ignored.
 *
 * @param url URL to fetch data from.
 * @param csvData CSV data to parse into JSON.
 * @returns Fetched CSV data.
 */
export async function fetchCsv(
  url?: string,
  csvData?: string
): Promise<DataRow[]> {
  let text;
  if (url) {
    const response = await fetch(url);
    text = await response.text();
  } else {
    assert(csvData, "Either url or csvData must be provided.");
    text = csvData;
  }
  const csv = Papa.parse(text, {
    header: true,
    dynamicTyping: true,
  });
  return csv.data as DataRow[];
}
