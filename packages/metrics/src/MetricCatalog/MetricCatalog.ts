import { useState, useEffect } from "react";
import fromPairs from "lodash/fromPairs";
import groupBy from "lodash/groupBy";
import keyBy from "lodash/keyBy";
import uniq from "lodash/uniq";

import { Region } from "@actnowcoalition/regions";
import { assert } from "@actnowcoalition/assert";

import { MetricCatalogOptions } from "./MetricCatalogOptions";
import { MetricData } from "../data/MetricData";
import { MultiMetricDataStore } from "../data/MultiMetricDataStore";
import { MultiRegionMultiMetricDataStore } from "../data/MultiRegionMultiMetricDataStore";
import { MetricDataProvider } from "../data_providers/MetricDataProvider";
import { Metric } from "../Metric/Metric";
import { MetricDefinition } from "../Metric/MetricDefinition";

/**
 * Catalog of metrics and the accompanying data providers to fetch data for them.
 */
export class MetricCatalog {
  /** All metrics in the catalog. */
  readonly metrics: Metric[];

  /** All metric data providers registered with the catalog. */
  readonly metricDataProviders: MetricDataProvider[];

  /** Options associated with the MetricCatalog. */
  readonly options: MetricCatalogOptions;

  private readonly metricsById: { [id: string]: Metric };

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
    this.metrics = metrics.map((metric) => new Metric({ ...metric }, options));
    this.metricsById = keyBy(this.metrics, "id");

    const referencedDataProviderIds = metrics.map(
      (m) => m.dataReference?.providerId
    );
    const missingDataProviderIds = referencedDataProviderIds.filter(
      (id) => !dataProviders.find((provider) => provider.id === id)
    );
    assert(
      missingDataProviderIds.length === 0,
      `Some metrics referenced data providers that do not exist: ${uniq(
        missingDataProviderIds
      ).join(", ")}`
    );
    this.metricDataProviders = dataProviders;
    this.options = options;
  }

  /**
   * Get a metric from the catalog.
   *
   * If the ID does not exist in the catalog, an error will be thrown.
   *
   * @param id The metric ID. See {@link MetricDefinition.id}.
   * @returns The metric.
   */
  getMetric(id: string): Metric {
    const metric = this.metricsById[id];
    assert(metric, `No metric found with id ${id}`);
    return metric;
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
    const dataStore = await this.fetchDataForMetricsAndRegions(
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
  async fetchDataForMetricsAndRegions(
    regions: Region[],
    metrics: Array<string | Metric>,
    includeTimeseries = true
  ): Promise<MultiRegionMultiMetricDataStore> {
    const regionsById = keyBy(regions, (r) => r.regionId);
    const resolvedMetrics = metrics.map((m) =>
      typeof m === "string" ? this.getMetric(m) : m
    );
    const metricsByProvider = groupBy(
      resolvedMetrics,
      (m) => m.dataReference?.providerId
    );

    const resultData: {
      [regionId: string]: { [metricId: string]: MetricData };
    } = {};
    for (const [providerId, metrics] of Object.entries(metricsByProvider)) {
      // Fetch data from appropriate data provider.
      const provider = this.metricDataProviders.find(
        (p) => p.id === providerId
      );
      assert(provider, `No data provider found for id ${providerId}`);
      const fetchedData = await provider.fetchData(
        regions,
        metrics,
        includeTimeseries
      );

      // Merge fetched data into resultData.
      for (const [regionId, regionData] of Object.entries(fetchedData.data)) {
        if (!resultData[regionId]) {
          resultData[regionId] = {};
        }
        for (const [metricId, metricData] of Object.entries(regionData.data)) {
          resultData[regionId][metricId] = metricData;
        }
      }
    }

    // Convert resultData into a map of MultiMetricDataStores.
    const result = fromPairs(
      Object.entries(resultData).map(([regionId, data]) => [
        regionId,
        new MultiMetricDataStore(regionsById[regionId], data),
      ])
    );
    return new MultiRegionMultiMetricDataStore(result);
  }

  /**
   * React hook to use data for a given `region` and `metric`.
   *
   * @param region The region to get data for.
   * @param metric The metric to get data for as either a string or `Metric` object.
   * @param includeTimeseries Whether to fetch timeseries data or not.
   * @returns The metric data.
   */
  useData(
    region: Region,
    metric: string | Metric,
    includeTimeseries = true
  ): DataOrError<MetricData> {
    const [data, setData] = useState<MetricData>();
    useEffect(() => {
      this.fetchData(region, metric, includeTimeseries)
        .then((data) => {
          setData(data);
        })
        .catch((error) => {
          console.error(
            `Error fetching metric data for ${metric} for ${region.regionId}: ${error}`
          );
          return { error };
        });
    }, [region, metric]);
    return { data };
  }

  /**
   * React hook to use data for a given `region` and multiple `metrics`.
   *
   * @param region The region to get data for.
   * @param metrics The metrics to get data for as either strings or `Metric` objects.
   * @param includeTimeseries Whether to fetch timeseries data or not.
   * @returns The metric data.
   */
  useDataForMetrics(
    region: Region,
    metrics: string[] | Metric[],
    includeTimeseries = true
  ): DataOrError<MultiMetricDataStore> {
    const [data, setData] = useState<MultiMetricDataStore>();
    // TODO(michael): This is a hack. We have to turn metricList into a string
    // to pass to the useEffect hook since useEffect doesn't do deep equality on
    // arrays. We probably need to do something similar for regions or else find
    // another workaround.
    const metricList = JSON.stringify(metrics);
    useEffect(() => {
      const metrics = JSON.parse(metricList);
      this.fetchDataForMetrics(region, metrics, includeTimeseries)
        .then((metricDataStore) => {
          setData(metricDataStore);
        })
        .catch((error) => {
          console.error(
            `Error fetching metric data for ${region.regionId}: ${error}`
          );
          return { error };
        });
    }, [region, metrics]);
    return { data };
  }

  /**
   * React hook to use data for multiple `regions` and multiple `metrics`.
   *
   * @param regions The regions to get data for.
   * @param metrics The metrics to get data for as either strings or `Metric` objects.
   * @param includeTimeseries Whether to fetch timeseries data or not.
   * @returns The metric data once fetched, else null.
   */
  useDataForRegionsAndMetrics(
    regions: Region[],
    metrics: string[] | Metric[],
    includeTimeseries = true
  ): DataOrError<MultiRegionMultiMetricDataStore> {
    const [data, setData] = useState<MultiRegionMultiMetricDataStore>();
    // TODO(michael): This is a hack. We have to turn metricList into a string
    // to pass to the useEffect hook since useEffect doesn't do deep equality on
    // arrays. We probably need to do something similar for regions or else find
    // another workaround.
    const metricList = JSON.stringify(metrics);
    useEffect(() => {
      const metrics = JSON.parse(metricList);
      this.fetchDataForMetricsAndRegions(regions, metrics, includeTimeseries)
        .then((multiRegionMetricDataStore) => {
          setData(multiRegionMetricDataStore);
        })
        .catch((error) => {
          console.error(`Error fetching metric data: ${error}`);
          return { error };
        });
    }, [metricList, regions]);
    return { data };
  }
}

/**
 * Used as the result of a React hook in order to represent one of three states:
 *
 * 1. The data is loading. (data and error are both nil)
 * 2. The data is loaded. (data is not nil, error is nil)
 * 3. The data failed to load. (data is nil, error is not nil)
 */
export type DataOrError<T> = { data?: T; error?: Error };
