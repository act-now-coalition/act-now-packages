import { assert } from "@actnowcoalition/assert";
import { Region, RegionDB } from "@actnowcoalition/regions";

import { Metric } from "../Metric";
import { MetricData } from "../data/MetricData";
import { SimpleMetricDataProviderBase } from "./SimpleMetricDataProviderBase";
import {
  DataRow,
  getMetricDataFromDataRows,
  groupAndValidateRegionIds,
  parseCsv,
} from "./data_provider_utils";
import { fetchText } from "./utils";

export interface CsvDataProviderOptions {
  /** URL of a CSV file to import from. */
  url?: string;
  /**
   * The regions that this CSV file contains data for. Used for validating the
   * incoming data.
   */
  regionDb: RegionDB;
  /** Name of column containing valid Region IDs. */
  regionColumn: string;
  /**
   * Name of column containing valid ISO 8601 date-time values.
   * Required if the CSV contains timeseries data, else it should not be specified.
   */
  dateColumn?: string;
  /**
   * CSV data to import in place of URL fetch, typically used for testing.
   * If this is provided, the URL will be ignored.
   * */
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
export class CsvDataProvider extends SimpleMetricDataProviderBase {
  private readonly regionDb: RegionDB;
  private readonly regionColumn: string;
  private readonly dateColumn?: string;
  private readonly url?: string;
  private fetchedText: Promise<string> | undefined;
  private dataRowsByRegionId:
    | Promise<{ [regionId: string]: DataRow[] }>
    | undefined;

  /**
   * Constructs a new CsvDataProvider instance.
   *
   * @param providerId A unique provider id to associate with the provider (e.g.
   * "my-datasource-csv"). This ID can be used from a {@link MetricDataReference} in a
   * metric to reference the data from this provider.
   * @param options Options to configure the provider.
   * The regionColumn must match the region identifier in Act Now Coalition's regions package.
   * (e.g. a nation's identifier in the regions package is the ISO 3 code.
   * So data for a nation must have ISO 3 code as its identifier.)
   */
  constructor(providerId: string, options: CsvDataProviderOptions) {
    assert(
      options.url || options.csvText,
      "Either a URL or CSV data must be provided to create an instance of CsvDataProvider."
    );
    super(providerId);
    this.regionDb = options.regionDb;
    this.regionColumn = options.regionColumn;
    this.dateColumn = options.dateColumn;
    this.url = options.url;
    if (options.csvText) {
      this.dataRowsByRegionId = this.getDataForCache(options.csvText);
    }
  }

  private async getDataForCache(
    csvText?: string
  ): Promise<{ [regionId: string]: DataRow[] }> {
    if (!csvText) {
      assert(this.url, "URL or csvText must be provided to populate cache.");
      csvText = await this.fetchCsvText();
    }
    assert(
      csvText,
      "We should have initialized fetchedText directly above or in the constructor"
    );
    const csv = parseCsv(csvText, [this.regionColumn]);
    assert(csv.length > 0, "CSV must not be empty.");
    const dataRowsByRegionId = groupAndValidateRegionIds(
      csv,
      this.regionDb,
      this.regionColumn,
      this.url
    );
    return dataRowsByRegionId;
  }

  async fetchDataForRegionAndMetric(
    region: Region,
    metric: Metric
  ): Promise<MetricData<unknown>> {
    // Populate the cache if it hasn't been populated or isn't being populated yet.
    this.dataRowsByRegionId = this.dataRowsByRegionId ?? this.getDataForCache();
    const dataRowsByRegionId = await this.dataRowsByRegionId;

    return getMetricDataFromDataRows(
      dataRowsByRegionId,
      region,
      metric,
      this.dateColumn
    );
  }

  /**
   * Fetches CSV data from a URL and returns the text content.
   *
   * @returns fetched CSV data.
   */
  private async fetchCsvText(): Promise<string> {
    assert(this.url, "URL must be specified in order to use fetchCsvText()");
    return fetchText(this.url);
  }
}
