import { assert } from "@actnowcoalition/assert";
import { Region } from "@actnowcoalition/regions";
import { CachingMetricDataProviderBase } from "./CachingMetricDataProviderBase";
import { Metric } from "../Metric";
import { MetricData } from "../data";
import {
  DataRow,
  dataRowToMetricData,
  dataRowsToMetricData,
} from "./data_provider_utils";
import { groupBy } from "lodash";
import Papa from "papaparse";

export interface CsvDataProviderOptions {
  /** URL of a CSV file to import from. */
  url?: string;
  /** Name of column containing valid Region IDs. */
  regionColumn: string;
  /**
   * Name of column containing valid ISO 8601 date-time values.
   * Required if the CSV contains timeseries data, else it should not be specified.
   */
  dateColumn?: string;
  /** CSV data to import in place of URL fetch, typically used for testing. */
  csvText?: string;
}

/**
 * Data Provider for importing data from wide-format CSV files.
 *
 * Assumes data is in wide form (variables as columns, indexed by region and date columns.)
 * E.g:
 * ```
 * |region |date       |var1 |var2 |
 * |TX     |2022-02-01 |12   |45   |
 * |CA     |2022-02-01 |31   |66   |
 * ```
 */
export class CsvDataProvider extends CachingMetricDataProviderBase {
  private readonly regionColumn: string;
  private readonly dateColumn?: string;
  private readonly url?: string;
  private readonly csvText?: string;
  private fetchedTextPromise: Promise<string> | undefined;

  private dataRowsByRegionId: { [regionId: string]: DataRow[] } = {};

  constructor(providerId: string, options: CsvDataProviderOptions) {
    assert(
      options.url || options.csvText,
      "Either a URL or CSV data must be provided to create an instance of CsvDataProvider."
    );
    super(providerId);
    this.regionColumn = options.regionColumn;
    this.dateColumn = options.dateColumn;
    this.url = options.url;
    this.csvText = options.csvText;
  }

  async populateCache(): Promise<void> {
    let csvText;
    if (this.url) {
      // We might already be fetching the CSV, in which case we can just wait on
      // the existing promise.
      this.fetchedTextPromise = this.fetchedTextPromise ?? this.fetchCsvText();
      csvText = await this.fetchedTextPromise;
    } else {
      assert(this.csvText, "Either url or csvData must be provided.");
      csvText = this.csvText;
    }
    const csv = parseCsv(csvText, this.regionColumn);
    assert(csv.length > 0, "CSV must not be empty.");
    const dataRowsByRegionId = groupBy(csv, (row) => row[this.regionColumn]);
    assert(
      !dataRowsByRegionId["undefined"],
      `One or more CSV rows were missing a region id value in column ${this.regionColumn}`
    );
    this.dataRowsByRegionId = dataRowsByRegionId;
  }

  getDataFromCache(
    region: Region,
    metric: Metric,
    includeTimeseries: boolean
  ): MetricData<unknown> {
    const metricKey = metric.dataReference?.column;
    assert(
      typeof metricKey === "string",
      "Missing or invalid metric column name. Ensure 'column' is included in metric's MetricDataReference"
    );
    let metricData: MetricData;
    if (this.dateColumn) {
      metricData = dataRowsToMetricData(
        this.dataRowsByRegionId,
        region,
        metric,
        metricKey,
        this.dateColumn
      );
    } else {
      metricData = dataRowToMetricData(
        this.dataRowsByRegionId,
        region,
        metric,
        metricKey
      );
    }
    if (includeTimeseries) {
      return metricData;
    } else {
      return metricData.dropTimeseries();
    }
  }

  /**
   * Fetches CSV data from a URL and returns the text content.
   *
   * @returns fetched CSV data.
   */
  private async fetchCsvText(): Promise<string> {
    assert(this.url, "URL must be specified in order to use fetchCsvText()");
    console.log("Fetching", this.url);
    const response = await fetch(this.url);
    if (response.status !== 200) {
      throw new Error(
        `Failed to fetch CSV data from ${this.url}: ${response.statusText}`
      );
    }
    return await response.text();
  }
}

/**
 * Transforms CSV text from string to JSON.
 *
 * @param csvText CSV text to parse.
 * @param regionColumn Name of column containing region IDs. It will be
 * preserved as a string, even if it has numeric values, to preserve FIPS codes
 * as strings.
 * @returns parsed CSV rows.
 */
function parseCsv(csvText: string, regionColumn: string): DataRow[] {
  const csv = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  const data = csv.data as DataRow[];
  sanitizeRows(data, [regionColumn]);
  return data;
}

/**
 * Sanitize CSV rows, turning numeric strings into numbers.
 *
 * @param rows Raw CSV rows.
 * @returns Sanitized CSV rows.
 */
function sanitizeRows(rows: DataRow[], excludeColumns: string[]): void {
  for (const row of rows) {
    for (const c in row) {
      if (excludeColumns.includes(c)) {
        continue;
      }
      const v = row[c] as string;
      if (/^-?[\d.eE]+$/.test(v)) {
        const num = Number.parseFloat(v.replace(/,/g, ""));
        if (!Number.isNaN(num)) {
          row[c] = num;
        }
      }
    }
  }
}
