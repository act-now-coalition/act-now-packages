import { assert } from "@actnowcoalition/assert";
import { Region } from "@actnowcoalition/regions";
import { CachingMetricDataProviderBase } from "./CachingMetricDataProviderBase";
import { Metric } from "../Metric";
import { MetricData } from "../data";
import { fetchCsv, DataRow, dataRowsToMetricData } from "./data_provider_utils";
import { groupBy } from "lodash";

interface CsvDataProviderOptions {
  /* URL of the CSV file to import from. */
  url: string;
  /* Name of column containing valid Region IDs. */
  regionColumn: string;
  /* Name of column containing valid ISO 8601 date-time values. */
  dateColumn?: string;
}

/**
 * Data Provider for importing data from CSV files.
 *
 * Assumes data is in wide form (variables as columns, indexed by region and date columns.)
 * E.g:
 * |region |date       |var1 |var2 |
 * |TX     |2022-02-01 |12   |45   |
 * |CA     |2022-02-01 |31   |66   |
 */
export class CsvDataProvider extends CachingMetricDataProviderBase {
  private readonly url: string;
  private readonly regionColumn: string;
  private readonly dateColumn?: string;

  readonly cachedData: { [key: string]: MetricData } = {};

  constructor(options: CsvDataProviderOptions) {
    super("csv-data");
    this.regionColumn = options.regionColumn;
    this.dateColumn = options.dateColumn;
    this.url = options.url;
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
        this.cachedData[cacheKey] = dataRowsToMetricData(
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
    includeTimeseries: boolean
  ): MetricData<unknown> {
    const cacheKey = `region:${region.regionId}_metric:${metric.id}`;
    const metricData = this.cachedData[cacheKey];
    assert(
      metricData,
      `Data for region and metric not found. Be sure populateCache() 
      has been invoked with expected region and metric.`
    );
    if (!includeTimeseries && metricData.hasTimeseries()) {
      return metricData.dropTimeseries();
    }
    return metricData;
  }
}
