import pLimit from "p-limit";
import { Region } from "@actnowcoalition/regions";
import { Metric } from "../Metric";
import { assert } from "@actnowcoalition/assert";
import {
  dataRowsToMetricData,
  dataRowToMetricData,
} from "./data_provider_utils";
import { DataRow } from "./data_provider_utils";
import { MetricData } from "../data/MetricData";
import { fetchJson } from "./utils";
import { MetricDataProvider } from "./MetricDataProvider";
import { MultiRegionMultiMetricDataStore } from "../data";
import mapValues from "lodash/mapValues";

// Limit having too many outstanding requests at once, to avoid timeouts, etc.
const MAX_CONCURRENT_REQUESTS = 50;

/**
 * Data provider to ingest data from the Covid Act Now API.
 *
 * Access nested JSON API data using dot notation. E.g.:
 * - For `newCases` data, set metric.dataReference.column to `actuals.newCases`.
 * - For hospital bed capacity, set metric.dataReference.column to `actuals.hospitalBeds.capacity`.
 * - For the CAN Community Level, set metric.dataReference.column to `communityLevels.canCommunityLevel`.
 */
export class CovidActNowDataProvider implements MetricDataProvider {
  /** Valid Covid Act Now API key to use in API calls. */
  private readonly apiKey: string;

  /** Cached CAN API responses indexed by the FIPS codes of the regions fetched. */
  private apiJson: { [regionId: string]: Promise<DataRow> };

  /**
   * Constructs a new CovidActNowDataProvider instance.
   *
   * @param id A unique provider id to associate with the provider (e.g.
   * "can-api"). This ID can be used from a {@link MetricDataReference} in a
   * metric to reference the data from this provider.
   * @param apiKey Valid Covid Act Now API key to use in API calls.
   * @param data JSON data to put directly into the cache. Used primarily for testing.
   */
  constructor(
    readonly id: string,
    apiKey: string,
    data?: { [regionId: string]: DataRow }
  ) {
    this.apiKey = apiKey;
    this.apiJson = mapValues(data ?? {}, (row) => Promise.resolve(row));
  }

  async fetchData(
    regions: Region[],
    metrics: Metric[],
    includeTimeseries: boolean
  ): Promise<MultiRegionMultiMetricDataStore<unknown>> {
    await this.populateCache(regions, includeTimeseries);
    return await MultiRegionMultiMetricDataStore.fromRegionsAndMetricsAsync(
      regions,
      metrics,
      (region: Region, metric: Metric) =>
        this.getDataFromCache(region, metric, includeTimeseries)
    );
  }

  /**
   * Checks if we have cached data for the specified regions already, else initiates requests to fetch them.
   * Note that we do not wait on them to finish. We just asynchronously start the requests and cache the promises.
   * @param regions Regions to ensure are cached.
   * @param includeTimeseries Whether timeseries data is required.
   */
  private populateCache(regions: Region[], includeTimeseries: boolean) {
    const fetchRegionIntoCache = (region: Region) => {
      const cacheKey = `${region.regionId}-${includeTimeseries}`;
      // If timeseries data exists in the cache, skip the fetch no matter what,
      // as the timeseries endpoints also contain all of the non-timeseries data,
      // and we will use this data if necessary via the getCachedData method.
      if (!this.getCachedData(region, includeTimeseries)) {
        const url = this.buildFetchUrl(region, includeTimeseries);
        try {
          this.apiJson[cacheKey] = fetchJson(url);
        } catch (e) {
          // TODO(michael): This should perhaps be fatal, but right now we have
          // a few US regions that don't have corresponding API data, so we
          // treat it as non-fatal.
          console.error(`Failed to fetch data for ${region}: ${e}`);
        }
      }
    };

    const limiter = pLimit(MAX_CONCURRENT_REQUESTS);
    regions.forEach((region) => limiter(() => fetchRegionIntoCache(region)));
  }

  private async getDataFromCache(
    region: Region,
    metric: Metric,
    includeTimeseries: boolean
  ): Promise<MetricData> {
    const metricKey = metric.dataReference?.column;
    assert(
      typeof metricKey === "string",
      `Metrics using ${this.id} data provider must specify the` +
        `CAN API field to access via the dataReference.column property.`
    );
    const cachedData = await this.getCachedData(region, includeTimeseries);
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
