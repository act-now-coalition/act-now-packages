import { states } from "@actnowcoalition/regions";

import {
  MultiRegionMultiMetricDataStore,
  SnapshotJSON,
} from "./MultiRegionMultiMetricDataStore";
import { MultiMetricDataStore } from "./MultiMetricDataStore";
import { MetricData } from "./MetricData";
import { Metric } from "../Metric";
import { StaticValueDataProvider } from "../data_providers";
import { isoDateOnlyString } from "@actnowcoalition/time-utils";
import { MetricCatalog } from "../MetricCatalog";

enum ProviderId {
  STATIC = "static",
}

const testRegion = states.findByRegionIdStrict("12");
const testMetric = new Metric({
  id: "cases_per_100k",
  dataReference: {
    providerId: ProviderId.STATIC,
    value: 42,
  },
});

const testProvider = new StaticValueDataProvider(ProviderId.STATIC);

const testMetricCatalog = new MetricCatalog([testMetric], [testProvider]);

// The snapshot JSON that corresponds to the data for `testRegion` and `testMetric`.
const testSnapshot: SnapshotJSON = {
  metadata: {
    createdDate: isoDateOnlyString(new Date()),
    latestDate: "2022-01-02",
  },
  data: {
    "12": {
      cases_per_100k: {
        currentValue: 42,
        timeseriesPoints: [
          {
            date: "2022-01-02",
            value: 42,
          },
        ],
      },
    },
  },
};

describe("MultiRegionMultiMetricDataStore", () => {
  test("toSnapshot() has correct form.", async () => {
    const dataStore = await testProvider.fetchData(
      [testRegion],
      [testMetric],
      /*includeTimeseries=*/ true,
      testMetricCatalog
    );
    expect(dataStore.toSnapshot()).toEqual(testSnapshot);
  });

  test("fromSnapshot() has correct forms.", async () => {
    const dataStore = await testProvider.fetchData(
      [testRegion],
      [testMetric],
      /*includeTimeseries=*/ true,
      testMetricCatalog
    );
    expect(
      MultiRegionMultiMetricDataStore.fromSnapshot(
        testSnapshot,
        [testRegion],
        [testMetric],
        /*includeTimeseries*/ true
      )
    ).toEqual(dataStore);

    const dataStoreNoTs = await testProvider.fetchData(
      [testRegion],
      [testMetric],
      /*includeTimeseries=*/ false,
      testMetricCatalog
    );
    expect(
      MultiRegionMultiMetricDataStore.fromSnapshot(
        testSnapshot,
        [testRegion],
        [testMetric],
        /*includeTimeseries=*/ false
      )
    ).toEqual(dataStoreNoTs);
  });

  test("assertFiniteNumbers() rejects non-numeric values", () => {
    const verifyValueThrowsError = (value: unknown) => {
      expect(() => {
        const data = new MultiRegionMultiMetricDataStore({
          region: new MultiMetricDataStore(testRegion, {
            metric: new MetricData(testMetric, testRegion, value),
          }),
        });
        data.assertFiniteNumbers();
      }).toThrowError();
    };
    verifyValueThrowsError("string");
    verifyValueThrowsError(undefined);
    verifyValueThrowsError(new Date());
    verifyValueThrowsError(Number.NaN);
  });

  test("assertFiniteNumbers() accepts numeric values", () => {
    const verifyValueIsValid = (value: number) => {
      expect(() => {
        const dataStore = new MultiRegionMultiMetricDataStore({
          region: new MultiMetricDataStore(testRegion, {
            metric: new MetricData(testMetric, testRegion, value),
          }),
        });
        dataStore.assertFiniteNumbers();
      }).not.toThrowError();
    };
    verifyValueIsValid(1);
    verifyValueIsValid(0);
    verifyValueIsValid(-1);
    verifyValueIsValid(0.53217);
  });

  test("regionData() has correct form and throws error if region is missing.", () => {
    const missingRegion = states.findByRegionIdStrict("06");
    const errorMsg = `No data for region ${missingRegion.regionId}. Did you forget to include it when you created the MultiRegionMetricDataStore?`;
    const multiMetricDataStore = new MultiMetricDataStore(testRegion, {
      metric: new MetricData(testMetric, testRegion, 42),
    });
    const multiRegionMultiMetricDataStore = new MultiRegionMultiMetricDataStore(
      {
        [testRegion.regionId]: multiMetricDataStore,
      }
    );
    expect(multiRegionMultiMetricDataStore.regionData(testRegion)).toEqual(
      multiMetricDataStore
    );
    expect(() => {
      multiRegionMultiMetricDataStore.regionData(missingRegion);
    }).toThrow(errorMsg);
  });
});
