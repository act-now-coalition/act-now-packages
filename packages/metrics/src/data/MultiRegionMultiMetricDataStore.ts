import { assert } from "@actnowcoalition/assert";
import { Region } from "@actnowcoalition/regions";
import mapValues from "lodash/mapValues";
import { MetricToDataMap, MultiMetricDataStore } from "./MultiMetricDataStore";
import { Timeseries, TimeseriesPointJSON } from "../Timeseries/Timeseries";
import { MetricData } from "./MetricData";
import { Metric } from "../Metric/Metric";

export interface SnapshotJSON {
  metadata: { createdDate: string; latestDate: string | null };
  data: RegionDataJSON;
}

export interface RegionDataJSON {
  [regionId: string]: MetricDataJSON;
}

interface MetricDataJSON {
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
  constructor(
    private regionToMultiMetricDataStoreMap: MultiRegionMultiMetricDataMap<T>
  ) {}

  regionData(region: Region): MultiMetricDataStore<T> {
    const regionId = region.regionId;
    const multiMetricDataStore = this.regionToMultiMetricDataStoreMap[regionId];
    assert(
      multiMetricDataStore,
      `No data for region ${regionId}. Did you forget to include it when you created the MultiRegionMetricDataStore?`
    );
    return multiMetricDataStore;
  }

  assertFiniteNumbers(): MultiRegionMultiMetricDataStore<number> {
    const regionToMultiMetricDataStoreMap = mapValues(
      this.regionToMultiMetricDataStoreMap,
      (multiMetricDataStore) => multiMetricDataStore.assertFiniteNumbers()
    );
    return new MultiRegionMultiMetricDataStore(regionToMultiMetricDataStoreMap);
  }

  /**
   * Persists all data into a JSON-compatible snapshot object.
   */
  toSnapshot(): SnapshotJSON {
    const metricDataStores = Object.values(
      this.regionToMultiMetricDataStoreMap
    );
    const records: RegionDataJSON = {};
    let maxDate: Date | undefined;
    Object.values(metricDataStores).forEach((dataStore) => {
      const regionId = dataStore.region.regionId;
      const metricDataJsons: MetricDataJSON = {};
      Object.values(dataStore.metricToDataMap).forEach((metricData) => {
        const timeseries = metricData.hasTimeseries()
          ? metricData.timeseries
          : undefined;
        if (timeseries?.hasData()) {
          maxDate =
            !maxDate || timeseries.maxDate() > maxDate
              ? timeseries.maxDate()
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
      assert(
        regionMetricDataJson,
        `Expected data for region ${region.regionId} not found.`
      );
      const regionMetricDataMap: MetricToDataMap<unknown> = {};
      metrics.forEach((metric) => {
        const metricDataJSON = regionMetricDataJson[metric.id];
        assert(
          metricDataJSON,
          `Expected data for metric ${metric.id} for region ${region.regionId} not found.`
        );
        regionMetricDataMap[metric.id] = new MetricData(
          metric,
          region,
          metricDataJSON.currentValue as unknown,
          metricDataJSON.timeseriesPoints && includeTimeseries
            ? Timeseries.fromJSON(metricDataJSON.timeseriesPoints)
            : undefined
        );
      });
      const multiMetricDataStore = new MultiMetricDataStore(
        region,
        regionMetricDataMap
      );
      multiRegionMultiMetricDataMap[region.regionId] = multiMetricDataStore;
    });
    return new MultiRegionMultiMetricDataStore(multiRegionMultiMetricDataMap);
  }
}
