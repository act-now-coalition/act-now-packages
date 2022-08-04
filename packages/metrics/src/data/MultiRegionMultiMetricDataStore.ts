import { assert } from "@actnowcoalition/assert";
import { Region } from "@actnowcoalition/regions";
import mapValues from "lodash/mapValues";
import { MultiMetricDataStore } from "./MultiMetricDataStore";

// TODO: Come up with better/more appropriate names
export interface SnapshotJSON {
  metadata: { date: string };
  data: RegionDataJSON;
}

export interface RegionDataJSON {
  [regionFips: string]: metricValueJSON;
}

export interface TimeseriesPointJSON {
  date: string;
  value: unknown;
}

interface metricValueJSON {
  [metricName: string]: {
    currentValue: unknown;
    timeseries: { points: TimeseriesPointJSON[] | null };
  };
}

/**
 * A metric data store containing data for multiple regions and multiple metrics.
 *
 * Useful when fetching / storing a bunch of metrics that a single component
 * needs.
 */
export class MultiRegionMultiMetricDataStore<T = unknown> {
  constructor(
    private regionToMultiMetricDataStoreMap: {
      [regionId: string]: MultiMetricDataStore<T>;
    }
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
   * Preps the contents of the currentValues in this.data to be persisted to JSON file.
   */
  createSnapshot(): SnapshotJSON {
    const metricDataStores = Object.values(
      this.regionToMultiMetricDataStoreMap
    );
    const records: RegionDataJSON = {};

    for (let i = 0; i < metricDataStores.length; i++) {
      const dataStore = metricDataStores[i];
      const regionFips = dataStore.region.regionId;
      const metricJsons: metricValueJSON = {};
      Object.values(dataStore.metricToDataMap).forEach((metric) => {
        if (metric !== undefined) {
          metricJsons[metric.metric.id] = {
            currentValue: metric.currentValue,
            timeseries: { points: metric.timeseries.toJSON() } ?? null,
          };
        }
      });
      records[regionFips] = metricJsons;
    }

    return {
      metadata: { date: new Date().toISOString() },
      data: records,
    };
  }
}
