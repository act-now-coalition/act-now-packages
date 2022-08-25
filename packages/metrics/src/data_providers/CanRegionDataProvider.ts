import {
  CachingMetricDataProviderBase,
  MetricData,
} from "packages/metrics/dist";
// import { dataRowsToMetricData, dataRowToMetricData } from "./data_provider_utils"
import { Region } from "@actnowcoalition/regions";
import { Metric } from "../Metric";

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
  snapshot: number;
}

export class CanRegionDataProvider extends CachingMetricDataProviderBase {
  private readonly fips: string;
  private readonly regionType: string;
  private readonly timeseries: boolean;
  private readonly url: string;
  private readonly snapshot: number;

  constructor(options: CanRegionDataProviderOptions) {
    super("covid-act-now");
    this.fips = options.fips;
    this.regionType = options.regionType;
    this.timeseries = options.timeseries;
    this.snapshot = options.snapshot;

    // Build URL for CAN API request.
    const baseUrl = `https://data.covidactnow.org/snapshot`;
    const queryUrl = `${this.snapshot}/v2/${this.regionType}/${this.fips}`;
    this.url =
      `${baseUrl}/${queryUrl}` +
      (this.timeseries ? `/timeseries` : ``) +
      `.json`;
  }

  async populateCache(): Promise<void> {
    const data = await fetch(this.url);
    await data.json();

    // const dataRows = json.data.map(row => {
    //     return {
    //         date: row.date,
    //         value: row.value
    //     }
    // })
  }
  getDataFromCache(region: Region, metric: Metric): MetricData<unknown> {
    return new MetricData(metric, region, 12);
  }
}
