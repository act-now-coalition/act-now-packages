import { assert } from "@actnowcoalition/assert";
import { Region, RegionDB } from "@actnowcoalition/regions";
import groupBy from "lodash/groupBy";
import isEmpty from "lodash/isEmpty";
import truncate from "lodash/truncate";

import { Metric } from "../Metric";
import { MetricData } from "../data";
import { SimpleMetricDataProviderBase } from "./SimpleMetricDataProviderBase";
import {
  DataRow,
  dataRowToMetricData,
  dataRowsToMetricData,
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
export class CsvDataProvider extends SimpleMetricDataProviderBase {
  private readonly regionDb: RegionDB;
  private readonly regionColumn: string;
  private readonly dateColumn?: string;
  private readonly url?: string;
  private fetchedText: Promise<string> | undefined;

  private dataRowsByRegionId: { [regionId: string]: DataRow[] } = {};

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
    this.fetchedText = options.csvText
      ? Promise.resolve(options.csvText)
      : undefined;
  }

  private async populateCache(): Promise<void> {
    if (this.url) {
      // We might already be fetching the CSV, in which case we can just wait on
      // the existing promise.
      this.fetchedText = this.fetchedText ?? this.fetchCsvText();
    }
    assert(
      this.fetchedText,
      "We should have initialized fetchedText directly above or in the constructor"
    );
    const csvText = await this.fetchedText;
    const csv = parseCsv(csvText, [this.regionColumn]);
    assert(csv.length > 0, "CSV must not be empty.");
    const dataRowsByRegionId = groupBy(csv, (row) => row[this.regionColumn]);
    assert(
      !dataRowsByRegionId["undefined"],
      `One or more CSV rows were missing a region id value in column ${this.regionColumn}`
    );

    const regionIds = Object.keys(dataRowsByRegionId);
    const unknownRegionIds = regionIds.filter(
      (regionId) => !this.regionDb.findByRegionId(regionId)
    );
    if (unknownRegionIds.length > 0) {
      const url = this.url ?? "data";
      console.warn(
        `Unrecognized region IDs encountered while parsing CSV ${url}: ${truncate(
          unknownRegionIds.join(", "),
          { length: 200 }
        )}`
      );
      if (unknownRegionIds.length === regionIds.length) {
        throw new Error(
          `Failed to parse CSV ${url}: All region IDs were invalid.`
        );
      }
    }

    this.dataRowsByRegionId = dataRowsByRegionId;
  }

  async fetchDataForRegionAndMetric(
    region: Region,
    metric: Metric,
    includeTimeseries: boolean
  ): Promise<MetricData<unknown>> {
    if (isEmpty(this.dataRowsByRegionId)) {
      await this.populateCache();
    }

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
        this.dateColumn,
        /* strict= */ true
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
    return fetchText(this.url);
  }
}
