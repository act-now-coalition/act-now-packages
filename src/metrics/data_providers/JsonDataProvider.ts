import { assert } from "../../assert";
import { Region, RegionDB } from "../../regions";
import { Metric } from "../Metric";
import { MetricData } from "../data/MetricData";
import { SimpleMetricDataProviderBase } from "./SimpleMetricDataProviderBase";
import {
  DataRow,
  getMetricDataFromDataRows,
  groupAndValidateRowsByRegionId,
} from "./data_provider_utils";
import { fetchJson } from "./utils";

export interface JsonDataProviderOptions {
  /** URL of the JSON file to import from. */
  url?: string;
  /**
   * The regions that this JSON file contains data for. Used for validating the
   * incoming data.
   */
  regionDb: RegionDB;
  /** Name of field containing valid Region IDs. */
  regionField: string;
  /**
   * Name of the field containing valid ISO 8601 date-time values.
   * Required if the JSON file contains timeseries data, else it should not be specified.
   */
  dateField?: string;
  /**
   * JSON data to import in place of URL fetch, typically used for testing.
   * If this is provided, the URL will be ignored.
   * */
  jsonData?: DataRow[];
}

/**
 * A data provider that fetches data from a JSON file.
 *
 * The JSON file should be an array of objects, where each object represents a single "row" of data.
 * @example format of a JSON file:
 * ```JSON
 *  [{
 *      "region": "12",
 *      "date": "2022-01-01",
 *      "metric1": 0.1
 *   },
 *  {
 *      "region": "25",
 *      "date": "2022-01-01",
 *      "metric1": 0.5
 *  }]
 * ```
 */
export class JsonDataProvider extends SimpleMetricDataProviderBase {
  private readonly regionDb: RegionDB;
  private readonly regionField: string;
  private readonly url?: string;
  private readonly dateField?: string;
  private dataRowsByRegionId:
    | Promise<{ [regionId: string]: DataRow[] }>
    | undefined;

  constructor(providerId: string, options: JsonDataProviderOptions) {
    assert(
      options.url || options.jsonData,
      "Either a URL or JSON data must be provided to create an instance of JsonDataProvider."
    );
    super(providerId);
    this.regionDb = options.regionDb;
    this.regionField = options.regionField;
    this.url = options.url;
    this.dateField = options.dateField;
    if (options.jsonData) {
      this.dataRowsByRegionId = this.getDataForCache(options.jsonData);
    }
  }

  private async getDataForCache(
    jsonData?: DataRow[]
  ): Promise<{ [regionId: string]: DataRow[] }> {
    if (!jsonData) {
      assert(this.url, "URL or jsonData must be provided to populate cache.");
      jsonData = await fetchJson(this.url);
    }

    assert(jsonData && jsonData.length > 0, "JSON array must not be empty.");
    const dataRowsByRegionId = groupAndValidateRowsByRegionId(
      jsonData,
      this.regionDb,
      this.regionField,
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
    const metricField = metric.dataReference?.field;
    assert(
      typeof metricField === "string",
      "Missing or invalid metric field name. Ensure 'field' is included in metric's MetricDataReference"
    );
    return getMetricDataFromDataRows(
      dataRowsByRegionId,
      region,
      metric,
      metricField,
      this.dateField
    );
  }
}
