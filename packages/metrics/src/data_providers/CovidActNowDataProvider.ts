import { CachingMetricDataProviderBase } from "./CachingMetricDataProviderBase";
import { Region } from "@actnowcoalition/regions";
import { Metric } from "../Metric";
import { assert } from "@actnowcoalition/assert";
import {
  dataRowsToMetricData,
  dataRowToMetricData,
} from "./data_provider_utils";
import { DataRow } from "./data_provider_utils";

/**
 * Data provider to ingest data from the Covid Act Now API.
 *
 * Access nested JSON API data using dot notation. E.g.:
 * - For `newCases` data, set metric.dataReference.column to `actuals.newCases`.
 * - For hospital bed capacity, set metric.dataReference.column to `actuals.hospitalBeds.capacity`.
 * - For the CAN Community Level, set metric.dataReference.column to `communityLevels.canCommunityLevel`.
 */
export class CovidActNowDataProvider extends CachingMetricDataProviderBase {
  /** Valid Covid Act Now API key to use in API calls. */
  private readonly apiKey: string;

  /** Cached CAN API responses indexed by the FIPS codes of the regions fetched. */
  private flattenedApiJson: { [regionId: string]: DataRow };

  /**
   * Constructs a new CovidActNowDataProvider instance.
   * @param apiKey Valid Covid Act Now API key to use in API calls.
   * @param data JSON data to put directly into the cache. Used primarily for testing.
   */
  constructor(apiKey: string, data?: { [regionId: string]: DataRow }) {
    super("covid-act-now-api");
    this.apiKey = apiKey;
    this.flattenedApiJson = data ?? {};
  }

  async populateCache(
    regions: Region[],
    metrics: Metric[],
    includeTimeseries: boolean
  ) {
    for (const region of regions) {
      const cacheKey = `${region.regionId}-${includeTimeseries}`;
      if (!this.flattenedApiJson[cacheKey]) {
        const url = this.buildFetchUrl(region, includeTimeseries);
        const response = await fetch(url);
        if (response.status !== 200) {
          throw new Error(
            `Error fetching data from ${url}: ${response.status}`
          );
        }
        const json = await response.json();
        this.flattenedApiJson[cacheKey] = json;
      }
    }
  }

  /**
   * Construct a Covid Act Now API url for a given region.
   *
   * @param region Region to create url for
   * @param includeTimeseries Whether to include timeseries data in API url.
   * @returns Covid Act Now API url for the given region and timeseries specification.
   */
  buildFetchUrl(region: Region, includeTimeseries: boolean): string {
    const regionType = determineRegionType(region);
    let urlLocation: string;
    if (regionType === "state") {
      urlLocation = region.abbreviation;
    } else if (regionType === "country") {
      urlLocation = "US";
    } else {
      urlLocation = region.regionId;
    }
    const baseUrl = `https://api.covidactnow.org/v2`;
    const queryUrl = `${regionType}/${urlLocation}`;
    const timeseriesStr = includeTimeseries ? ".timeseries" : "";
    return `${baseUrl}/${queryUrl}${timeseriesStr}.json?apiKey=${this.apiKey}`;
  }

  /**
   * Private helper method to retrieve data from cache.
   *
   * Always returns timeseries data if it exists,
   * otherwise, if includeTimeseries is false, return
   * non-timeseries data if it exists.
   *
   * @param region Region to retrieve data for
   * @param includeTimeseries Whether timeseries data is necessary.
   * @returns Data from cache, or undefined if no data found.
   */
  private getCachedData(region: Region, includeTimeseries: boolean) {
    // If we have timeseries data cached, we always use it.
    const cachedTimeseriesData =
      this.flattenedApiJson[`${region.regionId}-true`];
    if (cachedTimeseriesData) {
      return cachedTimeseriesData;
    } else if (!includeTimeseries) {
      // check for non-timeseries data cached.
      return this.flattenedApiJson[`${region.regionId}-false`];
    }
  }

  getDataFromCache(region: Region, metric: Metric, includeTimeseries: boolean) {
    const metricKey = metric.dataReference?.column;
    assert(
      typeof metricKey === "string",
      `Metrics using ${this.id} data provider must specify the` +
        `CAN API field to access via the dataReference.column property.`
    );
    const cachedData = this.getCachedData(region, includeTimeseries);
    assert(cachedData, `No valid data found in cache for ${region.regionId}`);
    const metricKeyParts = metricKey.split(/\.(.*)/);
    const tsLabel = `${metricKeyParts[0]}Timeseries`;
    const timeseriesData = cachedData[tsLabel] as DataRow[];

    if (includeTimeseries && timeseriesData) {
      const tsMetricKey = metricKeyParts[1];
      return dataRowsToMetricData(
        { [region.regionId]: timeseriesData },
        region,
        metric,
        tsMetricKey,
        /*dateKey=*/ "date"
      );
    } else {
      return dataRowToMetricData(
        { [region.regionId]: [cachedData] },
        region,
        metric,
        metricKey
      );
    }
  }
}

/**
 * Hacky helper function to determine the type of region.
 *
 * Assumes regions are of valid CAN API type
 * (e.g., a state, county, metro or USA).
 *
 * @param region Region to determine region type for.
 * @returns Region type string.
 */
function determineRegionType(
  region: Region
): "state" | "county" | "country" | "cbsa" {
  if (region.regionId === "USA") {
    return "country";
  } else if (region.regionId.length === 2) {
    return "state";
  } else {
    const isCounty = region.parent != null;
    return isCounty ? "county" : "cbsa";
  }
}
