import {
  CachingMetricDataProviderBase,
  MetricData,
} from "packages/metrics/dist";
// import { dataRowsToMetricData, dataRowToMetricData } from "./data_provider_utils"
import { Region } from "@actnowcoalition/regions";
import { Metric } from "../Metric";

interface CanDataProviderOptions {
  fips: string;
  regionType: "state" | "county" | "metro" | "country";
  timeseries: boolean;
  snapshot: number;
}

export class CanRegionDataProvider extends CachingMetricDataProviderBase {
  private readonly fips: string;
  private readonly regionType: string;
  private readonly timeseries: boolean;
  private readonly url: string;
  private readonly snapshot: number;

  constructor(options: CanDataProviderOptions) {
    super("covid-act-now");
    this.fips = options.fips;
    this.regionType = options.regionType;
    this.timeseries = options.timeseries;
    this.snapshot = options.snapshot;

    this.url = `https://data.covidactnow.org/snapshot/${this.snapshot}/v2/${this.regionType}/${this.fips}.timeseries.json`;
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
