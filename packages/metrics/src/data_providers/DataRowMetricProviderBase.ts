import { assert } from "@actnowcoalition/assert";
import { Region } from "@actnowcoalition/regions";
import isEmpty from "lodash/isEmpty";
import { MetricData } from "../data/MetricData";
import { Metric } from "../Metric";
import {
  DataRow,
  dataRowsToMetricData,
  dataRowToMetricData,
} from "./data_provider_utils";
import { SimpleMetricDataProviderBase } from "./SimpleMetricDataProviderBase";

export interface DataRowMetricProviderBaseOptions {
  /**
   * Name of column containing valid ISO 8601 date-time values.
   * Required if the JSON file contains timeseries data, else it should not be specified.
   */
  dateColumn?: string;
}

/** Convenience base class for data providers that parse data from DataRows.*/
export abstract class DataRowMetricProviderBase extends SimpleMetricDataProviderBase {
  private readonly dateColumn?: string;
  dataRowsByRegionId: { [regionId: string]: DataRow[] } = {};

  /**
   * Constructs a new instance of DataRowMetricProviderBase.
   *
   * @param providerId A unique provider id to associate with the provider (e.g.
   * "my-datasource"). This ID can be used from a {@link MetricDataReference} in a
   * metric to reference the data from this provider.
   * @param options Options with which to configure the provider.
   */
  constructor(id: string, options: DataRowMetricProviderBaseOptions) {
    super(id);
    this.dateColumn = options.dateColumn;
  }

  /**
   * Abstract method to be implemented by subclasses to fetch data from a data source.
   * Implementation should store fetched data in `this.dataRowsByRegionId`.
   *
   * See {@link CsvDataProvider} for an example implementation.
   */
  abstract populateCache(): Promise<void>;

  async fetchDataForRegionAndMetric(
    region: Region,
    metric: Metric,
    includeTimeseries: boolean
  ): Promise<MetricData<unknown>> {
    if (isEmpty(this.dataRowsByRegionId)) {
      await this.populateCache();
    }

    const metricKey = metric.dataReference?.column;
    assert(
      typeof metricKey === "string",
      "Missing or invalid metric column name. Ensure 'column' is included in metric's MetricDataReference"
    );
    let metricData: MetricData;
    if (this.dateColumn) {
      metricData = dataRowsToMetricData(
        this.dataRowsByRegionId,
        region,
        metric,
        metricKey,
        this.dateColumn,
        /* strict= */ true
      );
    } else {
      metricData = dataRowToMetricData(
        this.dataRowsByRegionId,
        region,
        metric,
        metricKey
      );
    }
    if (includeTimeseries) {
      return metricData;
    } else {
      return metricData.dropTimeseries();
    }
  }
}
