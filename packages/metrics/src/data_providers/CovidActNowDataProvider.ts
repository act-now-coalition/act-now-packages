import { CachingMetricDataProviderBase } from "./CachingMetricDataProviderBase";
import { Region } from "@actnowcoalition/regions";
import { Metric } from "../Metric";
import { assert } from "@actnowcoalition/assert";
import {
  dataRowsToMetricData,
  dataRowToMetricData,
} from "./data_provider_utils";
import { DataRow } from "./data_provider_utils";
import fetch from "node-fetch";
import chunk from "lodash/chunk";
import { MetricData } from "../data/MetricData";

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
  private apiJson: { [regionId: string]: DataRow };

  /**
   * Constructs a new CovidActNowDataProvider instance.
   *
   * @param providerId A unique provider id to associate with the provider (e.g.
   * "can-api"). This ID can be used from a {@link MetricDataReference} in a
   * metric to reference the data from this provider.
   * @param apiKey Valid Covid Act Now API key to use in API calls.
   * @param data JSON data to put directly into the cache. Used primarily for testing.
   */
  constructor(
    providerId: string,
    apiKey: string,
    data?: { [regionId: string]: DataRow }
  ) {
    super(providerId);
    this.apiKey = apiKey;
    this.apiJson = data ?? {};
  }

  async populateCache(
    regions: Region[],
    metrics: Metric[],
    includeTimeseries: boolean
  ) {
    // TODO(#240): This parallelization and retry logic is very crude and should be
    // cleaned up and generalized, or better yet replaced with some sort of
    // networking library that handles it for us.
    const chunks = chunk(regions, 50);
    for (const chunk of chunks) {
      await Promise.all(
        chunk.map(async (region) => {
          const cacheKey = `${region.regionId}-${includeTimeseries}`;
          // If timeseries data exists in the cache, skip the fetch no matter what,
          // as the timeseries endpoints also contain all of the non-timeseries data,
          // and we will use this data if necessary via the getCachedData method.
          if (!this.getCachedData(region, includeTimeseries)) {
            const url = this.buildFetchUrl(region, includeTimeseries);
            for (let attempt = 0; attempt < 3; attempt++) {
              try {
                console.log("Fetching", url);
                const response = await fetch(url);
                if (response.status !== 200) {
                  throw new Error(
                    `Error fetching data from ${url}: ${response.status}`
                  );
                }
                const json = await response.json();
                this.apiJson[cacheKey] = json;
                break;
              } catch (e) {
                console.error(e);
                if (attempt < 2) {
                  console.log(`Attempt ${attempt} failed. Retrying...`);
                }
              }
            }
          }
        })
      );
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
    if (!cachedData) {
      console.warn(
        `No data found in cache for ${region.regionId} with includeTimeseries=${includeTimeseries}. Perhaps the fetch failed?`
      );
      return new MetricData(metric, region, /*currentValue=*/ null);
    }
    const metricKeyParts = metricKey.split(/\.(.*)/);
    const tsLabel = `${metricKeyParts[0]}Timeseries`;
    const timeseriesData = cachedData[tsLabel] as DataRow[];

    // If we don't have timeseries data, just return the non-timeseries data.
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
    const cachedTimeseriesData = this.apiJson[`${region.regionId}-true`];
    if (cachedTimeseriesData) {
      return cachedTimeseriesData;
    } else if (!includeTimeseries) {
      // check for non-timeseries data cached.
      return this.apiJson[`${region.regionId}-false`];
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
