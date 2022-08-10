import { StaticValueDataProvider } from "./StaticValueDataProvider";
import { states } from "@actnowcoalition/regions";
import { Metric } from "../Metric/Metric";
import {
  MultiRegionMultiMetricDataStore,
  SnapshotJSON,
} from "./MultiRegionMultiMetricDataStore";
import { MultiMetricDataStore } from "./MultiMetricDataStore";
import { MetricData } from "./MetricData";

const TEST_REGION = states.findByRegionIdStrict("12");
const TEST_METRIC = new Metric({
  id: "cases_per_100k",
  dataReference: {
    providerId: "static-value",
    value: 42,
  },
});
const PROVIDER = new StaticValueDataProvider();
// The snapshot JSON that corresponds to the data for `TEST_REGION` and `TEST_METRIC`.
const TEST_SNAPSHOT: SnapshotJSON = {
  metadata: {
    createdDate: new Date().toISOString().split("T")[0],
    latestDate: "2022-01-02T00:00:00.000Z",
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
    const dataStore = await PROVIDER.fetchData(
      [TEST_REGION],
      [TEST_METRIC],
      /*includeTimeseries=*/ true
    );
    expect(dataStore.toSnapshot()).toEqual(TEST_SNAPSHOT);
  });

  test("fromSnapshot() has correct forms.", async () => {
    const dataStore = await PROVIDER.fetchData(
      [TEST_REGION],
      [TEST_METRIC],
      /*includeTimeseries=*/ true
    );
    expect(
      MultiRegionMultiMetricDataStore.fromSnapshot(
        TEST_SNAPSHOT,
        [TEST_REGION],
        [TEST_METRIC],
        /*includeTimeseries*/ true
      )
    ).toEqual(dataStore);

    const dataStoreNoTs = await PROVIDER.fetchData(
      [TEST_REGION],
      [TEST_METRIC],
      /*includeTimeseries=*/ false
    );
    expect(
      MultiRegionMultiMetricDataStore.fromSnapshot(
        TEST_SNAPSHOT,
        [TEST_REGION],
        [TEST_METRIC],
        /*includeTimeseries=*/ false
      )
    ).toEqual(dataStoreNoTs);
  });

  test("fromSnapshot() fails if data for region or metric is missing.", async () => {
    expect(() => {
      MultiRegionMultiMetricDataStore.fromSnapshot(
        TEST_SNAPSHOT,
        [TEST_REGION, states.findByRegionIdStrict("36")],
        [TEST_METRIC],
        /*includeTimeseries=*/ false
      );
    }).toThrow();
    expect(() => {
      MultiRegionMultiMetricDataStore.fromSnapshot(
        TEST_SNAPSHOT,
        [TEST_REGION],
        [TEST_METRIC, new Metric({ id: "something-really-cool" })],
        /*includeTimeseries=*/ false
      );
    }).toThrow();
  });

  test("assertFiniteNumbers() rejects non-numeric values", () => {
    const verifyValueThrowsError = (value: unknown) => {
      expect(() => {
        const data = new MultiRegionMultiMetricDataStore({
          region: new MultiMetricDataStore(TEST_REGION, {
            metric: new MetricData(TEST_METRIC, TEST_REGION, value),
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
        console.log("do i exist");
        const dataStore = new MultiRegionMultiMetricDataStore({
          region: new MultiMetricDataStore(TEST_REGION, {
            metric: new MetricData(TEST_METRIC, TEST_REGION, value),
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
    const multiMetricDataStore = new MultiMetricDataStore(TEST_REGION, {
      metric: new MetricData(TEST_METRIC, TEST_REGION, 42),
    });
    const multiRegionMultiMetricDataStore = new MultiRegionMultiMetricDataStore(
      {
        [TEST_REGION.regionId]: multiMetricDataStore,
      }
    );
    expect(multiRegionMultiMetricDataStore.regionData(TEST_REGION)).toEqual(
      multiMetricDataStore
    );
    expect(() => {
      multiRegionMultiMetricDataStore.regionData(missingRegion);
    }).toThrow(errorMsg);
  });
});
