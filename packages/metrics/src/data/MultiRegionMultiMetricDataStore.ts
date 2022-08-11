import mapValues from "lodash/mapValues";

import { assert } from "@actnowcoalition/assert";
import { Region } from "@actnowcoalition/regions";

import { MetricData } from "./MetricData";
import { MetricToDataMap, MultiMetricDataStore } from "./MultiMetricDataStore";
import { Metric } from "../Metric";
import { Timeseries, TimeseriesPointJSON } from "../Timeseries";

export interface SnapshotJSON {
  metadata: { createdDate: string; latestDate: string | null };
  data: RegionDataJSON;
}

export interface RegionDataJSON {
  [regionId: string]: MetricDataJSON;
}

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
  constructor(readonly data: MultiRegionMultiMetricDataMap<T>) {}

  /** Whether this data store is empty. */
  get isEmpty(): boolean {
    return Object.keys(this.data).length === 0;
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
  hasMetricData(region: Region, metric: Metric): boolean {
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
   * Persists all data into a JSON-compatible snapshot object.
   */
  toSnapshot(): SnapshotJSON {
    const metricDataStores = Object.values(this.data);
    const records: RegionDataJSON = {};
    let maxDate: Date | undefined;
    Object.values(metricDataStores).forEach((dataStore) => {
      const regionId = dataStore.region.regionId;
      const metricDataJsons: MetricDataJSON = {};
      Object.values(dataStore.data).forEach((metricData) => {
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
      });
      records[regionId] = metricDataJsons;
    });

    return {
      metadata: {
        createdDate: new Date().toISOString().split("T")[0],
        latestDate: maxDate?.toISOString() ?? null,
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
