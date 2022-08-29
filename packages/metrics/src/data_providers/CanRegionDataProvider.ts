import { MetricData } from "../data/MetricData";
import { CachingMetricDataProviderBase } from "./CachingMetricDataProviderBase";
// import { dataRowsToMetricData, dataRowToMetricData } from "./data_provider_utils"
import {
  counties,
  metros,
  nations,
  Region,
  states,
} from "@actnowcoalition/regions";
import { Metric } from "../Metric";
import { assert } from "@actnowcoalition/assert";
import {
  dataRowsToMetricData,
  dataRowToMetricData,
} from "./data_provider_utils";
import flat from "flat";
import { DataRow } from "./data_provider_utils";

enum LOCATION_TYPE {
  STATE = "state",
  COUNTY = "county",
  METRO = "metro",
  COUNTRY = "country",
}

interface CanRegionDataProviderOptions {
  fips: string;
  regionType: LOCATION_TYPE;
  timeseries: boolean;
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
  private readonly regionType: string;
  private readonly timeseries: boolean;
  private readonly url: string;
  private readonly apiKey: string;
  private readonly region: Region;

  flattenedApiJson: { [key: string]: unknown } = {};

  constructor(options: CanRegionDataProviderOptions) {
    super("covid-act-now");
    this.regionType = options.regionType;
    this.timeseries = options.timeseries;
    this.apiKey = options.apiKey;

    // Find region object from FIPS code.
    // Is there a way to use FIPS code without needing regionType?
    switch (options.regionType) {
      case LOCATION_TYPE.STATE: {
        this.region = states.findByRegionIdStrict(options.fips);
        break;
      }
      case LOCATION_TYPE.COUNTY: {
        this.region = counties.findByRegionIdStrict(options.fips);
        break;
      }
      case LOCATION_TYPE.METRO: {
        this.region = metros.findByRegionIdStrict(options.fips);
        break;
      }
      case LOCATION_TYPE.COUNTRY: {
        this.region = nations.findByRegionIdStrict(options.fips);
        break;
      }
      default: {
        throw new Error(`Invalid region type: ${options.regionType}`);
      }
    }

    // Construct URL for CAN API request.
    const urlLocation =
      this.regionType === LOCATION_TYPE.STATE
        ? this.region.abbreviation
        : this.region.regionId;
    const baseUrl = `https://api.covidactnow.org/v2`;
    const queryUrl = `${this.regionType}/${urlLocation}`;
    const timeseriesStr = this.timeseries ? ".timeseries" : "";
    this.url = `${baseUrl}/${queryUrl}${timeseriesStr}.json?apiKey=${this.apiKey}`;
  }

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
   * @param url API url to construct CanRegionDataProvider from.
   * @returns New CanRegionDataProvider instance.
   */
  static fromApiUrl(url: string): CanRegionDataProvider {
    // TODO: Add more validation to ensure valid urls.
    // Kinda dumb to deconsruct url into parts and then reconstruct it in the constructor.
    const regionType = /(?<=v2\/)(.*)(?=\/)/.exec(url);
    assert(
      regionType && regionType.length > 0,
      `Invalid region key parsed from url`
    );
    const apiKey = /(?<=apiKey=)(.*)/.exec(url);
    assert(apiKey && apiKey.length > 0, `Invalid api key parsed from url`);
    const timeseries = /\.timeseries/.test(url);
    const location = new RegExp(`(?<=${regionType[1]}/)[^.]*`, "i").exec(url);
    assert(location && location.length > 0, `Invalid location parsed from url`);

    let fips: string;
    if (regionType[1] === LOCATION_TYPE.STATE) {
      const state = states.all.find(
        (state) => state.abbreviation === location[0]
      );
      assert(state, `State not found for location: ${location[0]}`);
      fips = state.regionId;
    } else {
      fips = location[0];
    }
    return new CanRegionDataProvider({
      fips: fips,
      regionType: regionType[1] as LOCATION_TYPE,
      timeseries: timeseries,
      apiKey: apiKey[1],
    });
  }

  async populateCache(): Promise<void> {
    const data = await fetch(this.url);
    if (data.status !== 200) {
      throw new Error(`Error fetching data from ${this.url}: ${data.status}`);
    }
    const json = await data.json();
    this.flattenedApiJson = flat(json, { safe: true });
  }

  getDataFromCache(
    region: Region,
    metric: Metric,
    includeTimeseries: boolean
  ): MetricData<unknown> {
    assert(
      region === this.region,
      `Region must match region in API call: ${region.regionId}. Instead found: ${region}`
    );
    assert(
      !(includeTimeseries && !this.timeseries),
      `Timeseries must be specified to use includeTimeseries.`
    );
    const metricKey = metric.dataReference?.column;
    assert(
      typeof metricKey === "string",
      `Metric key must exist and be of type string.`
    );

    if (includeTimeseries) {
      // Extract the timeseries name from the metric key by splitting on the first '.'.
      // E.g. 'actuals.hospitalBeds.capacity' -> ['actuals', 'hospitalBeds.capacity']
      const metricKeyParts = metricKey.split(/\.(.*)/);
      const timeseriesLabel = `${metricKeyParts[0]}Timeseries`;
      const metricName = metricKeyParts[1];
      const timeseriesData = this.flattenedApiJson[
        timeseriesLabel
      ] as DataRow[];
      const flatTsData = timeseriesData.map((row) => flat(row, { safe: true }));
      assert(
        flatTsData !== undefined,
        `Unable to find timeseries with label ${timeseriesLabel}.` +
          `Check that this timeseries label is expected (e.g. 'metricsTimeseries')`
      );
      return dataRowsToMetricData(
        { [region.regionId]: flatTsData as DataRow[] },
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
