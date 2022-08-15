import { assert } from "@actnowcoalition/assert";
import { Region } from "@actnowcoalition/regions";
import { CachingMetricDataProviderBase } from "./CachingMetricDataProviderBase";
import { Metric } from "../Metric";
import { MetricData } from "../data";
import { fetchCsv, DataRow, rowsToMetricData } from "./data_provider_utils";
import { groupBy } from "lodash";

export class CsvDataProvider extends CachingMetricDataProviderBase {
  private readonly url: string;
  private readonly regionColumn: string;
  private readonly dateColumn?: string;

  readonly cachedData: { [key: string]: MetricData } = {};

  constructor(url: string, regionColumn: string, dateColumn?: string) {
    super("csv-data");
    this.regionColumn = regionColumn;
    this.dateColumn = dateColumn;
    this.url = url;
  }

  async populateCache(
    regions: Region[],
    metrics: Metric[],
    includeTimeseries: boolean
  ): Promise<void> {
    const csv: DataRow[] = await fetchCsv(this.url);
    assert(
      csv.length > 0 &&
        csv.every((row) => row[this.regionColumn] !== undefined),
      "CSV must contain region column entry for all rows."
    );
    const groupedCsvRows = groupBy(csv, (row) => row[this.regionColumn]);
    regions.forEach((region) => {
      metrics.forEach((metric) => {
        const cacheKey = `region:${region.regionId}_metric:${metric.id}`;
        this.cachedData[cacheKey] = rowsToMetricData(
          groupedCsvRows,
          region,
          metric,
          includeTimeseries,
          this.dateColumn
        );
      });
    });
  }

  getDataFromCache(
    region: Region,
    metric: Metric,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    includeTimeseries: boolean
  ): MetricData<unknown> {
    const cacheKey = `region:${region.regionId}_metric:${metric.id}`;
    const metricData = this.cachedData[cacheKey];
    assert(
      metricData,
      "Data for region and metric not found. Be sure populateCache() has been called before calling this method. "
    );
    return metricData;
  }
}
