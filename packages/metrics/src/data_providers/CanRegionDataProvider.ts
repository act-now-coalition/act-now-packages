import { MetricData } from "../data/MetricData";
import { CachingMetricDataProviderBase } from "./CachingMetricDataProviderBase";
import { counties, metros, Region } from "@actnowcoalition/regions";
import { Metric } from "../Metric";
import { assert } from "@actnowcoalition/assert";
import {
  dataRowsToMetricData,
  dataRowToMetricData,
} from "./data_provider_utils";
import flatten from "flat";
import { DataRow } from "./data_provider_utils";
import fetch from "node-fetch";

/**
 * Data provider to ingest data from a Covid Act Now region API endpoint.
 *
 * Access nested JSON API data using dot notation. E.g.:
 * - For `newCases` data, set metric.dataReference.column to `actuals.newCases`.
 * - For hospital bed capacity, set metric.dataReference.column to `actuals.hospitalBeds.capacity`.
 * - For the CAN Community Level, set metric.dataReference.column to `communityLevels.canCommunityLevel`.
 */
export class CanRegionDataProvider extends CachingMetricDataProviderBase {
  /** Valid Covid Act Now API key to use in API calls. */
  private readonly apiKey: string;

  /** Data to be used instead of an API call. Used for testing. */
  private readonly data?: { [regionId: string]: DataRow };

  /** Cached CAN API responses indexed by the FIPS codes of the regions fetched. */
  private flattenedApiJson: { [regionId: string]: DataRow } = {};

  constructor(
    providerId: string,
    apiKey: string,
    data?: { [regionId: string]: DataRow }
  ) {
    super(providerId);
    this.apiKey = apiKey;
    this.data = data;
  }

  async populateCache(
    regions: Region[],
    metrics: Metric[],
    includeTimeseries: boolean
  ) {
    let json;
    for (const region of regions) {
      if (this.data) {
        json = this.data[region.regionId];
      } else {
        const url = this.buildFetchUrl(region, includeTimeseries);
        const response = await fetch(url);
        if (response.status !== 200) {
          throw new Error(
            `Error fetching data from ${url}: ${response.status}`
          );
        }
        json = await response.json();
      }
      this.flattenedApiJson[region.regionId] = flattenDataForRegion(json);
    }
  }

  getDataFromCache(
    region: Region,
    metric: Metric,
    includeTimeseries: boolean
  ): MetricData<unknown> {
    const metricKey = metric.dataReference?.column;
    assert(
      typeof metricKey === "string",
      `Metric key must exist and be of type string.`
    );

    if (includeTimeseries) {
      // Get the timeseries prefix from the flat metric key by splitting on the first '.'.
      // E.g. 'actuals.hospitalBeds.capacity' -> ['actuals', 'hospitalBeds.capacity', '']
      const metricKeyParts = metricKey.split(/\.(.*)/);
      const tsLabel = `${metricKeyParts[0]}Timeseries`;
      const metricName = metricKeyParts[1];
      const timeseriesData = this.flattenedApiJson[region.regionId][tsLabel];
      assert(
        timeseriesData !== undefined,
        `Unable to find timeseries with label ${tsLabel}. ` +
          `Check that this timeseries label is valid (e.g. 'metricsTimeseries') ` +
          `and that metric ${metric} is expected to have timeseries data.`
      );
      return dataRowsToMetricData(
        { [region.regionId]: timeseriesData as DataRow[] },
        region,
        metric,
        metricName,
        /*dateKey=*/ "date"
      );
    } else {
      const data = this.flattenedApiJson[region.regionId];
      return dataRowToMetricData(
        { [region.regionId]: [data] },
        region,
        metric,
        metricKey
      );
    }
  }

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
    const countyOrNull = counties.findByRegionId(region.regionId);
    const metroOrNull = metros.findByRegionId(region.regionId);
    assert(
      (countyOrNull && !metroOrNull) || (!countyOrNull && metroOrNull),
      `Cannot determine region type for region: ${region.regionId}`
    );
    return countyOrNull ? "county" : "cbsa";
  }
}

/**
 * Flatten an API response JSON.
 *
 * Flattens the objects inside first-level arrays while leaving the arrays themselves unchanged.
 * This is used to flatten the data inside the CAN timeseries (e.g. actualsTimeseries) without
 * flattening the arrays themselves.
 *
 * @param json JSON to flatten.
 * @returns Flattened JSON.
 */
function flattenDataForRegion(json: DataRow) {
  // TODO: write our own flatten function such that we can remove npm-flat as a dependency,
  // and so that we don't have to iterate through all the array keys like this.
  const flattened: DataRow = flatten(json, { safe: true });
  for (const key in flattened) {
    if (Array.isArray(flattened[key])) {
      const flattenedRows: DataRow[] = [];
      for (const row of flattened[key] as DataRow[]) {
        flattenedRows.push(flatten(row, { safe: true }));
      }
      flattened[key] = flattenedRows;
    }
  }
  return flattened;
}
