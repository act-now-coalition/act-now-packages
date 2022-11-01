import mapValues from "lodash/mapValues";

import { assert } from "@actnowcoalition/assert";
import { Region } from "@actnowcoalition/regions";

import { MetricData } from "./MetricData";
import { MetricToDataMap, MultiMetricDataStore } from "./MultiMetricDataStore";
import { Metric } from "../Metric";
import { Timeseries, TimeseriesPointJSON } from "../Timeseries";
import { isoDateOnlyString } from "@actnowcoalition/time-utils";

/**
 * JSON format of a data snapshot representing the contents of a
 * MultiRegionMultiMetricDataStore instance.
 */
export interface SnapshotJSON {
  metadata: { createdDate: string; latestDate: string | null };
  data: RegionDataJSON;
}

/**
 * JSON format of a data snapshot representing the contents of a
 * MultiMetricDataStore instance.
 */
export interface RegionDataJSON {
  [regionId: string]: MetricDataJSON;
}

/**
 * JSON format of a data snapshot representing the contents of a
 * MetricData instance.
 */
export interface MetricDataJSON {
  [metricName: string]: {
    currentValue: unknown;
    timeseriesPoints?: TimeseriesPointJSON[];
  };
}

export interface MultiRegionMultiMetricDataMap<T> {
  [regionId: string]: MultiMetricDataStore<T>;
}

/**
 * A metric data store containing data for multiple regions and multiple metrics.
 *
 * Useful when fetching / storing a bunch of metrics that a single component
 * needs.
 */
export class MultiRegionMultiMetricDataStore<T = unknown> {
  constructor(private data: MultiRegionMultiMetricDataMap<T>) {}

  /**
   * Static constructor to create a MultiRegionMultiMetricDataStore from a list
   * of regions, a list of metrics, and a dataGetter callback that returns MetricData
   * for each region and metric combination.
   *
   * @param regions Regions to create data for.
   * @param metrics Metrics to create data for.
   * @param dataGetter Callback that returns MetricData for each region and metric combination.
   * @returns Created MultiRegionMultiMetricDataStore instance.
   */
  static fromRegionsAndMetrics<T = unknown>(
    regions: Region[],
    metrics: Metric[],
    dataGetter: (region: Region, metric: Metric) => MetricData<T>
  ): MultiRegionMultiMetricDataStore<T> {
    const data: { [regionId: string]: MultiMetricDataStore<T> } = {};
    for (const region of regions) {
      const regionData: { [metricId: string]: MetricData<T> } = {};
      for (const metric of metrics) {
        regionData[metric.id] = dataGetter(region, metric);
      }
      data[region.regionId] = new MultiMetricDataStore<T>(region, regionData);
    }

    return new MultiRegionMultiMetricDataStore(data);
  }

  /**
   * Static async constructor to create a MultiRegionMultiMetricDataStore from a list
   * of regions, a list of metrics, and a dataFetcher callback that returns
   * Promise<MetricData> for each region and metric combination.
   *
   * @param regions Regions to create data for.
   * @param metrics Metrics to create data for.
   * @param dataFetcher Callback that returns `Promise<MetricData>` for each
   * region and metric combination. Once the returned promises resolve, they
   * will be assembled into a `MultiRegionMultiMetricDataStore`.
   * @returns Created `MultiRegionMultiMetricDataStore` instance.
   */
  static async fromRegionsAndMetricsAsync<T = unknown>(
    regions: Region[],
    metrics: Metric[],
    dataFetcher: (region: Region, metric: Metric) => Promise<MetricData<T>>
  ): Promise<MultiRegionMultiMetricDataStore<T>> {
    const data: { [regionId: string]: MultiMetricDataStore<T> } = {};
    for (const region of regions) {
      const regionData: { [metricId: string]: MetricData<T> } = {};
      for (const metric of metrics) {
        regionData[metric.id] = await dataFetcher(region, metric);
      }
      data[region.regionId] = new MultiMetricDataStore<T>(region, regionData);
    }

    return new MultiRegionMultiMetricDataStore(data);
  }

  /** Whether this data store is empty. */
  get isEmpty(): boolean {
    return Object.keys(this.data).length === 0;
  }

  /**
   * Returns the `MultiMetricDataStore` for every region in the data store.
   */
  get all(): MultiMetricDataStore<T>[] {
    return Object.values(this.data);
  }

  /**
   * Gets all metric data for a given region.
   *
   * @param region The region to get data for.
   * @returns A MultiMetricDataStore containing all metrics for the given region.
   */
  regionData(region: Region): MultiMetricDataStore<T> {
    const regionId = region.regionId;
    const multiMetricDataStore = this.data[regionId];
    assert(
      multiMetricDataStore,
      `No data for region ${regionId}. Did you forget to include it when you created the MultiRegionMetricDataStore?`
    );
    return multiMetricDataStore;
  }

  /**
   * Checks if the data store contains data for the given region.
   *
   * @param region The region to check for data for.
   * @returns Whether the data store contains data for the given region.
   */
  hasRegionData(region: Region): boolean {
    return this.data[region.regionId] !== undefined;
  }

  /**
   * Gets the metric data for a given region and metric.
   * @param region The region to get data for.
   * @param metric The metric to get data for.
   * @returns The metric data.
   */
  metricData(region: Region, metric: Metric | string): MetricData<T> {
    return this.regionData(region).metricData(metric);
  }

  /**
   * Checks if the data store contains data for the given region and metric.
   *
   * @param region The region to check for data for.
   * @param metric The metric to check for data for.
   * @returns Whether the data store contains data for the given region and metric.
   */
  hasMetricData(region: Region, metric: Metric | string): boolean {
    return (
      this.hasRegionData(region) &&
      this.regionData(region).hasMetricData(metric)
    );
  }

  /**
   * Throws an exception if any values for any metrics for any regions are not
   * finite numbers (e.g. strings, null, undefined, infinity, NaN).
   *
   * The returned data store will be cast to `MultiRegionMultiMetricDataStore<number>` so
   * any subsequent code doesn't need to deal with non-number values.
   * @returns
   */
  assertFiniteNumbers(): MultiRegionMultiMetricDataStore<number> {
    const regionToMultiMetricDataStoreMap = mapValues(
      this.data,
      (multiMetricDataStore) => multiMetricDataStore.assertFiniteNumbers()
    );
    return new MultiRegionMultiMetricDataStore(regionToMultiMetricDataStoreMap);
  }

  /**
   * Merges the provided data store into this one and returns the result.
   *
   * Data from the provided data store takes precedence over any existing data.
   *
   * @param other The data store to merge into this one.
   * @returns The merged data store.
   */
  merge(
    other: MultiRegionMultiMetricDataStore<T>
  ): MultiRegionMultiMetricDataStore<T> {
    const data: MultiRegionMultiMetricDataMap<T> = { ...this.data };
    for (const regionId in other.data) {
      const otherRegionData = other.data[regionId];
      if (data[regionId]) {
        data[regionId] = data[regionId].merge(otherRegionData);
      } else {
        data[regionId] = otherRegionData;
      }
    }
    return new MultiRegionMultiMetricDataStore(data);
  }

  /**
   * Removes timeseries data for all regions and metrics.
   *
   * @returns new MultiRegionMultiMetricDataStore object without timeseries data.
   */
  dropTimeseries(): MultiRegionMultiMetricDataStore<T> {
    return new MultiRegionMultiMetricDataStore(
      mapValues(this.data, (multiMetricDataStore) =>
        multiMetricDataStore.dropTimeseries()
      )
    );
  }

  /**
   * Persists all data into a JSON-compatible snapshot object.
   */
  toSnapshot(): SnapshotJSON {
    const metricDataStores = Object.values(this.data);
    const records: RegionDataJSON = {};
    let maxDate: Date | undefined;
    Object.values(metricDataStores).forEach((dataStore) => {
      const regionId = dataStore.region.regionId;
      const metricDataJsons: MetricDataJSON = {};
      for (const metricData of dataStore.all) {
        const timeseries = metricData.hasTimeseries()
          ? metricData.timeseries
          : undefined;
        if (timeseries?.hasData()) {
          maxDate =
            !maxDate || timeseries.maxDate > maxDate
              ? timeseries.maxDate
              : maxDate;
        }
        metricDataJsons[metricData.metric.id] = {
          currentValue: metricData.currentValue,
          timeseriesPoints: timeseries?.toJSON(),
        };
      }
      records[regionId] = metricDataJsons;
    });

    return {
      metadata: {
        createdDate: isoDateOnlyString(new Date()),
        latestDate: maxDate ? isoDateOnlyString(maxDate) : null,
      },
      data: records,
    };
  }

  /**
   * Creates a class instance from a snapshot for specified regions and metrics.
   *
   * @param snapshotJSON An output of this.toSnapshot() to deserialize.
   * @param regions Regions to include.
   * @param metrics Metrics to read from snapshotJSON.
   * @param includeTimeseries Whether to include metric timeseries.
   * @returns MultiRegionMultiMetricDataStore deserialized from snapshotJSON.
   */
  static fromSnapshot(
    snapshotJSON: SnapshotJSON,
    regions: Region[],
    metrics: Metric[],
    includeTimeseries = true
  ): MultiRegionMultiMetricDataStore {
    const multiRegionMultiMetricDataMap: {
      [regionId: string]: MultiMetricDataStore<unknown>;
    } = {};
    regions.forEach((region) => {
      const regionMetricDataJson = snapshotJSON.data[region.regionId];
      if (regionMetricDataJson) {
        const regionMetricDataMap: MetricToDataMap<unknown> = {};
        metrics.forEach((metric) => {
          const metricDataJSON = regionMetricDataJson[metric.id];
          if (metricDataJSON) {
            regionMetricDataMap[metric.id] = new MetricData(
              metric,
              region,
              metricDataJSON.currentValue as unknown,
              metricDataJSON.timeseriesPoints && includeTimeseries
                ? Timeseries.fromJSON(metricDataJSON.timeseriesPoints)
                : undefined
            );
          }
        });
        const multiMetricDataStore = new MultiMetricDataStore(
          region,
          regionMetricDataMap
        );
        if (!multiMetricDataStore.isEmpty) {
          multiRegionMultiMetricDataMap[region.regionId] = multiMetricDataStore;
        }
      }
    });
    return new MultiRegionMultiMetricDataStore(multiRegionMultiMetricDataMap);
  }
}
