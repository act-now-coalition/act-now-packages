import fromPairs from "lodash/fromPairs";

import { Region } from "../../regions";
import { validate } from "../../validate";
import { Metric } from "../Metric";
import type { MetricCatalog } from "../MetricCatalog";
import { MetricData, MultiRegionMultiMetricDataStore } from "../data";
import { MetricDataProvider } from "./MetricDataProvider";

/**
 * Base class to help implement a MetricDataProvider that provides data by
 * transforming data from another existing metric.  Implementers just need to
 * set the `id` of the data provider and implement the `transformData()` method.
 *
 * Metrics that use the data provider should specify the source metric to be transformed
 * via the `sourceMetric` field of the `dataReference` field of the metric.
 *
 * @example
 * ```typescript
 * class RollingAverageMetricDataProvider extends TransformedMetricDataProvider {
 *   readonly id = "rolling-average";
 *
 *   transformData(sourceData: MetricData<unknown>, newMetric: Metric, region: Region): MetricData<unknown> {
 *     const ts = sourceData.timeseries;
 *     const newTs = ts.rollingAverage({
 *       days: 7,
 *       treatMissingDatesAsZero: true
 *     });
 *     return new MetricData(newMetric, region, newTs.last?.value ?? null, newTs);
 *   }
 * }
 *
 * const metricDef = {
 *   id: "average-cases",
 *   dataReference: {
 *     providerId: "rolling-average",
 *     sourceMetric: "cases",
 * };
 * ```
 */
export abstract class TransformedMetricDataProvider
  implements MetricDataProvider
{
  abstract readonly id: string;

  /**
   * Transforms `sourceData` from the source metric to create the data for
   * `newMetric`.
   *
   * @param sourceData The source data from the metric specified in the
   * `sourceMetric` field of the metric's `dataReference`.
   * @param newMetric The metric to generate transformed data for.
   * @param region The region to generate data for.
   * @returns The transformed data.
   */
  abstract transformData(
    sourceData: MetricData,
    newMetric: Metric,
    region: Region
  ): MetricData;

  async fetchData(
    regions: Region[],
    metrics: Metric[],
    includeTimeseries: boolean,
    metricCatalog: MetricCatalog
  ): Promise<MultiRegionMultiMetricDataStore<unknown>> {
    // Map each metric to its source metric so we can fetch / use them.
    const metricToSourceMetricMap = fromPairs(
      metrics.map((metric) => {
        const sourceMetric = metric.dataReference?.sourceMetric as string;
        validate(
          typeof sourceMetric === "string",
          `Metric ${metric.id} is using ${this.id} data provider but does not have a sourceMetric.`
        );
        return [metric.id, sourceMetric];
      })
    );

    // Fetch data for the source metrics.
    const sourceMetrics = Object.values(metricToSourceMetricMap);
    const sourceMetricsData = await metricCatalog.fetchDataForRegionsAndMetrics(
      regions,
      sourceMetrics,
      includeTimeseries
    );

    // Transform the source metrics data.
    return MultiRegionMultiMetricDataStore.fromRegionsAndMetrics(
      regions,
      metrics,
      (region, metric) => {
        const sourceData = sourceMetricsData.metricData(
          region,
          metricToSourceMetricMap[metric.id]
        );

        // Defer to the derived class's transformData() method to actually
        // transform the data.
        return this.transformData(sourceData, metric, region);
      }
    );
  }
}
