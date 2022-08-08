import { assert } from "@actnowcoalition/assert";
import { Region } from "@actnowcoalition/regions";
import max from "lodash/max";
import mapValues from "lodash/mapValues";
import { MultiMetricDataStore } from "./MultiMetricDataStore";

export interface SnapshotJSON {
  metadata: { createdDate: string; latestDate: string | null };
  data: RegionDataJSON;
}

export interface RegionDataJSON {
  [regionFips: string]: metricDataJSON;
}

export interface TimeseriesPointJSON {
  date: string;
  value: unknown;
}

interface metricDataJSON {
  [metricName: string]: {
    currentValue: unknown;
    timeseries: { points: TimeseriesPointJSON[] | null };
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
   * Preps the contents of this.data to be persisted to JSON file.
   */
  createSnapshot(): SnapshotJSON {
    const metricDataStores = Object.values(
      this.regionToMultiMetricDataStoreMap
    );
    const records: RegionDataJSON = {};
    const maxDates: (Date | undefined)[] = [];
    for (let i = 0; i < metricDataStores.length; i++) {
      const dataStore = metricDataStores[i];
      const regionFips = dataStore.region.regionId;
      const metricJsons: metricDataJSON = {};

      Object.values(dataStore.metricToDataMap).forEach((metric) => {
        if (metric !== undefined) {
          maxDates.push(metric.timeseries.maxDate());
          metricJsons[metric.metric.id] = {
            currentValue: metric.currentValue,
            timeseries: { points: metric.timeseries.toJSON() } ?? null,
          };
        }
      });
      records[regionFips] = metricJsons;
    }

    return {
      metadata: {
        createdDate: new Date().toISOString(),
        latestDate: max(maxDates)?.toISOString() ?? null,
      },
      data: records,
    };
  }
}
