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

export abstract class DataRowMetricProviderBase extends SimpleMetricDataProviderBase {
  private readonly dateColumn?: string;
  dataRowsByRegionId: { [regionId: string]: DataRow[] } = {};

  constructor(providerId: string, options: DataRowMetricProviderBaseOptions) {
    super(providerId);
    this.dateColumn = options.dateColumn;
  }

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
