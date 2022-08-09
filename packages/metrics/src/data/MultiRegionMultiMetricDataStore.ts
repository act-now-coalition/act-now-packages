import { assert } from "@actnowcoalition/assert";
import { Region } from "@actnowcoalition/regions";
import mapValues from "lodash/mapValues";
import { MultiMetricDataStore } from "./MultiMetricDataStore";

/**
 * A metric data store containing data for multiple regions and multiple metrics.
 *
 * Useful when fetching / storing a bunch of metrics that a single component
 * needs.
 */
export class MultiRegionMultiMetricDataStore<T = unknown> {
  constructor(
    readonly data: {
      [regionId: string]: MultiMetricDataStore<T>;
    }
  ) {}

  regionData(region: Region): MultiMetricDataStore<T> {
    const regionId = region.regionId;
    const multiMetricDataStore = this.data[regionId];
    assert(
      multiMetricDataStore,
      `No data for region ${regionId}. Did you forget to include it when you created the MultiRegionMetricDataStore?`
    );
    return multiMetricDataStore;
  }

  assertFiniteNumbers(): MultiRegionMultiMetricDataStore<number> {
    const regionToMultiMetricDataStoreMap = mapValues(
      this.data,
      (multiMetricDataStore) => multiMetricDataStore.assertFiniteNumbers()
    );
    return new MultiRegionMultiMetricDataStore(regionToMultiMetricDataStoreMap);
  }
}
