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

/**
 * Data provider to ingest data from a Covid Act Now region API endpoint.
 *
 * Access nested JSON API data using dot notation. E.g.:
 * - For `newCases` data, set metric.dataReference.column to `actuals.newCases`.
 * - For hospital bed capacity, set metric.dataReference.column to `actuals.hospitalBeds.capacity`.
 * - For the CAN Community Level, set metric.dataReference.column to `communityLevels.canCommunityLevel`.
 */
export class CanRegionDataProvider extends CachingMetricDataProviderBase {
  /** Valid Covid Act Now API key to use in API calls*/
  private readonly apiKey: string;

  /** Cached CAN API responses indexed by the FIPS codes of the regions fetched. */
  private flattenedApiJson: { [region: string]: { [key: string]: unknown } } =
    {};

  constructor(providerId: string, apiKey: string) {
    super(providerId);
    this.apiKey = apiKey;
  }

  async populateCache(
    regions: Region[],
    metrics: Metric[],
    includeTimeseries: boolean
  ) {
    for (const region of regions) {
      const url = this.buildFetchUrl(region, includeTimeseries);
      const data = await fetch(url);
      if (data.status !== 200) {
        throw new Error(`Error fetching data from ${url}: ${data.status}`);
      }
      const json = await data.json();
      const flattened: DataRow = flat(json, { safe: true });
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
      this.flattenedApiJson[region.regionId] = flattened;
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
      // Get the timeseries prefix from the flattened metric key by splitting on the first '.'.
      // E.g. 'actuals.hospitalBeds.capacity' -> ['actuals', 'hospitalBeds.capacity', '']
      const metricKeyParts = metricKey.split(/\.(.*)/);
      const tsLabel = `${metricKeyParts[0]}Timeseries`;
      const metricName = metricKeyParts[1];
      const timeseriesData = this.flattenedApiJson[region.regionId][tsLabel];
      assert(
        timeseriesData !== undefined,
        `Unable to find timeseries with label ${tsLabel}. ` +
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
      const data = [this.flattenedApiJson[region.regionId]] as DataRow[];
      return dataRowToMetricData(
        { [region.regionId]: data },
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
