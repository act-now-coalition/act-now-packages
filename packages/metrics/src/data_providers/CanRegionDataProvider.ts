import { MetricData } from "../data/MetricData";
import { CachingMetricDataProviderBase } from "./CachingMetricDataProviderBase";
import { counties, metros, Region } from "@actnowcoalition/regions";
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
  /** Region of the data provider. */
  region: Region;
  /** Whether to include timeseries data in the data fetch. */
  timeseries: boolean;
  /** Valid Covid Act Now API key. */
  apiKey: string;
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

  private flattenedApiJson: { [key: string]: unknown } = {};

  constructor(providerId: string, options: CanRegionDataProviderOptions) {
    super(providerId);
    this.region = options.region;
    this.timeseries = options.timeseries;

    // Build the CAN API url from options.
    const regionType = determineRegionType(this.region);
    let urlLocation: string;
    if (regionType === "state") {
      urlLocation = this.region.abbreviation;
    } else if (regionType === "country") {
      urlLocation = "US";
    } else {
      urlLocation = this.region.regionId;
    }
    const baseUrl = `https://api.covidactnow.org/v2`;
    const queryUrl = `${regionType}/${urlLocation}`;
    const timeseriesStr = this.timeseries ? ".timeseries" : "";
    this.url = `${baseUrl}/${queryUrl}${timeseriesStr}.json?apiKey=${options.apiKey}`;
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
