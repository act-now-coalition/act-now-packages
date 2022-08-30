import { MetricData } from "../data/MetricData";
import { CachingMetricDataProviderBase } from "./CachingMetricDataProviderBase";
import { Region } from "@actnowcoalition/regions";
import { Metric } from "../Metric";
import { assert } from "@actnowcoalition/assert";
import {
  dataRowsToMetricData,
  dataRowToMetricData,
} from "./data_provider_utils";
import flat from "flat";
import { DataRow } from "./data_provider_utils";
import fetch from "node-fetch";

interface CanRegionDataProviderOptions {
  /** ID to use for the data provider*/
  providerId: string;
  /** Region of the data provider. This should match the region in the API url. */
  region: Region;
  /** Valid Covid Act Now API url for a single region. */
  url: string;
}

/**
 * Data provider to ingest data from a Covid Act Now region API endpoint.
 *
 * Access nested JSON API data using dot notation. E.g.:
 * - For `newCases` data, set metric.dataReference.column to `actuals.newCases`.
 * - For hospital bed capacity, set metric.dataReference.column to `actuals.hospitalBeds.capacity`.
 * - For the CAN Community Level, set metric.dataReference.column to `communityLevels.canCommunityLevel`.
 */
export class CanRegionDataProvider extends CachingMetricDataProviderBase {
  private readonly timeseries: boolean;
  private readonly url: string;
  private readonly region: Region;

  flattenedApiJson: { [key: string]: unknown } = {};

  /**
   * Construct an instance of CanRegionDataProvider from a valid
   * JSON Covid Act Now API url.
   *
   * Example urls:
   * ```
   * https://api.covidactnow.org/v2/county/25017.timeseries.json?apiKey=<api_key>
   * https://api.covidactnow.org/v2/state/NH.json?apiKey=<api_key>
   * ```
   *
   */
  constructor(options: CanRegionDataProviderOptions) {
    super(options.providerId);
    this.region = options.region;
    this.url = options.url;
    this.timeseries = /\.timeseries/.test(this.url);

    // TODO: add validation that this.region === the region in the this.url
    // and that url is at all valid.
  }

  async populateCache(): Promise<void> {
    const data = await fetch(this.url);
    if (data.status !== 200) {
      throw new Error(`Error fetching data from ${this.url}: ${data.status}`);
    }
    const json = await data.json();
    const flattened: { [key: string]: unknown } = flat(json, { safe: true });
    // We want to flatten the objects inside the arrays/timeseries while leaving the arrays themselves intact.
    // TODO: write our own flatten function such that we can remove npm-flat as a dependency,
    // and so that we don't have to iterate through all the array keys like this.
    for (const key in flattened) {
      if (Array.isArray(flattened[key])) {
        const flattenedRows: DataRow[] = [];
        for (const row of flattened[key] as DataRow[]) {
          flattenedRows.push(flat(row, { safe: true }));
        }
        flattened[key] = flattenedRows;
      }
    }
    this.flattenedApiJson = flattened;
  }

  getDataFromCache(
    region: Region,
    metric: Metric,
    includeTimeseries: boolean
  ): MetricData<unknown> {
    assert(
      region === this.region,
      `Region must match region in provider: ${region.regionId}. Instead found: ${region}`
    );
    assert(
      !(includeTimeseries && !this.timeseries),
      `Timeseries option must be included in API url to use includeTimeseries.`
    );
    const metricKey = metric.dataReference?.column;
    assert(
      typeof metricKey === "string",
      `Metric key must exist and be of type string.`
    );

    if (includeTimeseries) {
      // Get the timeseries prefix from the flattened metric key by splitting on the first '.'.
      // E.g. 'actuals.hospitalBeds.capacity' -> ['actuals', 'hospitalBeds.capacity', '']
      const metricKeyParts = metricKey.split(/\.(.*)/);
      const timeseriesLabel = `${metricKeyParts[0]}Timeseries`;
      const metricName = metricKeyParts[1];
      const timeseriesData = this.flattenedApiJson[timeseriesLabel];
      assert(
        timeseriesData !== undefined,
        `Unable to find timeseries with label ${timeseriesLabel}. ` +
          `Check that this timeseries label is expected (e.g. 'metricsTimeseries')`
      );
      return dataRowsToMetricData(
        { [region.regionId]: timeseriesData as DataRow[] },
        region,
        metric,
        metricName,
        "date"
      );
    } else {
      return dataRowToMetricData(
        { [region.regionId]: [this.flattenedApiJson as DataRow] },
        region,
        metric,
        metricKey
      );
    }
  }
}
