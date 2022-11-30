import { assert } from "@actnowcoalition/assert";
import { RegionDB } from "@actnowcoalition/regions";
import {
  DataRowMetricProviderBase,
  DataRowMetricProviderBaseOptions,
} from "./DataRowMetricProviderBase";
import { DataRow, groupAndValidateRegionIds } from "./data_provider_utils";
import { fetchJson } from "./utils";

export interface JsonDataProviderOptions
  extends DataRowMetricProviderBaseOptions {
  /** URL of the JSON file to import from. */
  url?: string;
  /**
   * The regions that this JSON file contains data for. Used for validating the
   * incoming data.
   */
  regionDb: RegionDB;
  /** Name of column containing valid Region IDs. */
  regionColumn: string;
  /** JSON data to import in place of URL fetch, typically used for testing. */
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
export class JsonDataProvider extends DataRowMetricProviderBase {
  private readonly regionDb: RegionDB;
  private readonly regionColumn: string;
  private readonly url?: string;
  private fetchedData: Promise<DataRow[]> | undefined;

  constructor(providerId: string, options: JsonDataProviderOptions) {
    assert(
      options.url || options.jsonData,
      "Either a URL or JSON data must be provided to create an instance of JsonDataProvider."
    );
    super(providerId, options);
    this.regionDb = options.regionDb;
    this.regionColumn = options.regionColumn;
    this.url = options.url;
    this.fetchedData = options.jsonData
      ? Promise.resolve(options.jsonData)
      : undefined;
  }

  async populateCache(): Promise<void> {
    if (this.url) {
      // We might already be fetching the JSON, in which case we can just wait on
      // the existing promise.
      this.fetchedData = this.fetchedData ?? fetchJson(this.url);
    }
    assert(
      this.fetchedData,
      "We should have initialized fetchedData directly above or in the constructor"
    );
    const jsonData = await this.fetchedData;
    assert(jsonData.length > 0, "JSON array must not be empty.");
    const dataRowsByRegionId = groupAndValidateRegionIds(
      jsonData,
      this.regionDb,
      this.regionColumn,
      this.url
    );

    this.dataRowsByRegionId = dataRowsByRegionId;
  }
}
