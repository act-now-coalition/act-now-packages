import groupBy from "lodash/groupBy";
import keyBy from "lodash/keyBy";
import uniq from "lodash/uniq";

import { Region } from "@actnowcoalition/regions";
import { assert } from "@actnowcoalition/assert";

import { MetricCatalogOptions } from "./MetricCatalogOptions";
import {
  MetricData,
  MultiMetricDataStore,
  MultiRegionMultiMetricDataStore,
} from "../data";
import { MetricDataProvider } from "../data_providers";
import { Metric, MetricDefinition } from "../Metric";

/**
 * Catalog of metrics and the accompanying data providers to fetch data for them.
 *
 * MetricCatalog is the central class for dealing with metrics.  It stores the definitions
 * of all known metrics and can be used to fetch data for them as needed.
 */
export class MetricCatalog {
  /** All metrics in the catalog. */
  readonly metrics: Metric[];

  /** All metric data providers registered with the catalog. */
  readonly dataProvidersById: { [id: string]: MetricDataProvider };

  /** Options associated with the MetricCatalog. */
  readonly options: MetricCatalogOptions;

  private readonly metricsById: { [id: string]: Metric };

  /**
   * Count of times that the MetricCatalog has had to fetch data from one or
   * more data providers (e.g. any of the fetchData() methods were called, or a
   * useData() hook was called with new metrics / regions).
   *
   * Used for debugging / testing.
   */
  dataFetchesCount = 0;

  /**
   * Constructs a new {@link MetricCatalog} from the given metrics, data providers, and options.
   *
   * @param metrics The metrics to include in the catalog.
   * @param dataProviders The data providers used to fetch data for metrics.
   * @param options Additional options for the catalog.
   */
  constructor(
    metrics: MetricDefinition[],
    dataProviders: MetricDataProvider[],
    options: MetricCatalogOptions = {}
  ) {
    this.metrics = metrics.map((metric) => new Metric(metric, options));
    this.metricsById = keyBy(this.metrics, "id");
    this.dataProvidersById = keyBy(dataProviders, (p) => p.id);

    const referencedDataProviderIds = metrics.map(
      (m) => m.dataReference?.providerId
    );
    const missingDataProviderIds = referencedDataProviderIds.filter(
      (id) => id && !this.dataProvidersById[id]
    );
    assert(
      missingDataProviderIds.length === 0,
      `Some metrics referenced data providers that do not exist: ${uniq(
        missingDataProviderIds
      ).join(", ")}`
    );
    this.options = options;
  }

  /**
   * Get a metric from the catalog.
   *
   * If the ID does not exist in the catalog, an error will be thrown.
   *
   * For convenience this method also accepts `Metric` objects and will just return them as-is.
   *
   * @param metricOrId The metric ID (or an existing `Metric` object). See {@link MetricDefinition#id}.
   * @returns The metric.
   */
  getMetric(metricOrId: Metric | string): Metric {
    if (metricOrId instanceof Metric) {
      // As a sanity-check, make sure it's a metric from this catalog.
      assert(
        metricOrId === this.metricsById[metricOrId.id],
        "getMetric() called with unrecognized metric"
      );
      return metricOrId;
    } else {
      const metric = this.metricsById[metricOrId];
      assert(metric, `No metric found with id ${metricOrId}`);
      return metric;
    }
  }

  /**
   * Fetch data for a given `region` and `metric`.
   *
   * @param region The region to get data for.
   * @param metric The metric to get data for as either a string or `Metric` object.
   * @param includeTimeseries Whether to fetch timeseries data or not.
   * @returns The metric data.
   */
  async fetchData(
    region: Region,
    metric: string | Metric,
    includeTimeseries = true
  ): Promise<MetricData> {
    const dataStore = await this.fetchDataForMetrics(
      region,
      [metric],
      includeTimeseries
    );
    return dataStore.metricData(metric);
  }

  /**
   * Fetch data for a given `region` and multiple `metrics`.
   *
   * @param region The region to get data for.
   * @param metrics The metrics to get data for as either strings or `Metric` objects.
   * @param includeTimeseries Whether to fetch timeseries data or not.
   * @returns The metric data.
   */
  async fetchDataForMetrics(
    region: Region,
    metrics: Array<string | Metric>,
    includeTimeseries = true
  ): Promise<MultiMetricDataStore> {
    const dataStore = await this.fetchDataForRegionsAndMetrics(
      [region],
      metrics,
      includeTimeseries
    );
    return dataStore.regionData(region);
  }

  /**
   * Fetch data for multiple `regions` and multiple `metrics`.
   *
   * @param regions The regions to get data for.
   * @param metrics The metrics to get data for as either strings or `Metric` objects.
   * @param includeTimeseries Whether to fetch timeseries data or not.
   * @returns The metric data.
   */
  async fetchDataForRegionsAndMetrics(
    regions: Region[],
    metrics: Array<string | Metric>,
    includeTimeseries = true
  ): Promise<MultiRegionMultiMetricDataStore> {
    this.dataFetchesCount++;

    const resolvedMetrics = metrics.map((m) => this.getMetric(m));

    let result = new MultiRegionMultiMetricDataStore({});
    if (this.options.snapshot) {
      result = MultiRegionMultiMetricDataStore.fromSnapshot(
        this.options.snapshot,
        regions,
        resolvedMetrics,
        includeTimeseries
      );
    }

    // Filter out any metrics for which we got data for all regions from the
    // snapshot so we don't do the work to fetch it from the data provider.
    // TODO(michael): We could optimize this to deal with cases where we have
    // some but not all regions for a metric (so that we don't refetch the
    // regions we have), but for now we'll keep it simple.
    const remainingMetrics = resolvedMetrics.filter((metric) =>
      regions.some(
        (region) =>
          !result.hasMetricData(region, metric) ||
          (includeTimeseries &&
            !result.metricData(region, metric).hasTimeseries())
      )
    );

    const metricsByProvider = groupBy(
      remainingMetrics,
      (m) => m.dataReference?.providerId
    );

    // For each provider, fetch the data for the metrics it provides and merge
    // it into result.
    for (const [providerId, metrics] of Object.entries(metricsByProvider)) {
      const provider = this.dataProvidersById[providerId];
      assert(provider, `No data provider found for id ${providerId}`);
      const fetchedData = await provider.fetchData(
        regions,
        metrics,
        includeTimeseries,
        this
      );
      result = result.merge(fetchedData);
    }
    return result;
  }
}
