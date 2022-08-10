import { StaticValueDataProvider } from "./StaticValueDataProvider";
import { states } from "@actnowcoalition/regions";
import { Metric } from "../Metric/Metric";
import {
  MultiRegionMultiMetricDataStore,
  SnapshotJSON,
} from "./MultiRegionMultiMetricDataStore";
import { MultiMetricDataStore } from "./MultiMetricDataStore";
import { MetricData } from "./MetricData";

describe("MultiRegionMultiMetricDataStore", () => {
  const region = states.findByRegionIdStrict("12");
  const metric = new Metric({
    id: "cases_per_100k",
    dataReference: {
      providerId: "static-value",
      value: 42,
    },
  });
  const provider = new StaticValueDataProvider();
  const expectedSnapshot: SnapshotJSON = {
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

  test("toSnapshot() has correct form.", async () => {
    const dataStore = await provider.fetchData(
      [region],
      [metric],
      /*includeTimeseries=*/ true
    );
    expect(dataStore.toSnapshot()).toEqual(expectedSnapshot);
  });

  test("fromSnapshot() has correct forms.", async () => {
    const dataStore = await provider.fetchData(
      [region],
      [metric],
      /*includeTimeseries=*/ true
    );
    expect(
      MultiRegionMultiMetricDataStore.fromSnapshot(
        expectedSnapshot,
        [region],
        [metric],
        /*includeTimeseries*/ true
      )
    ).toEqual(dataStore);

    expectedSnapshot.data[region.regionId][metric.id].timeseriesPoints =
      undefined;
    const dataStoreNoTs = await provider.fetchData(
      [region],
      [metric],
      /*includeTimeseries=*/ false
    );
    expect(
      MultiRegionMultiMetricDataStore.fromSnapshot(
        expectedSnapshot,
        [region],
        [metric],
        /*includeTimeseries*/ false
      )
    ).toEqual(dataStoreNoTs);
  });

  test("fromSnapshot() fails if data for region or metric is missing.", async () => {
    expect(() => {
      MultiRegionMultiMetricDataStore.fromSnapshot(
        expectedSnapshot,
        [region, states.findByRegionIdStrict("36")],
        [metric],
        /*includeTimeseries*/ false
      );
    }).toThrow();
    expect(() => {
      MultiRegionMultiMetricDataStore.fromSnapshot(
        expectedSnapshot,
        [region],
        [metric, new Metric({ id: "something-really-cool" })],
        /*includeTimeseries*/ false
      );
    }).toThrow();
  });

  test("assertFiniteNumbers() rejects non-numeric values", () => {
    const verifyValueThrowsError = (value: unknown) => {
      expect(() => {
        const data = new MultiRegionMultiMetricDataStore({
          region: new MultiMetricDataStore(region, {
            metric: new MetricData(metric, region, value),
          }),
        });
        data.assertFiniteNumbers();
      }).toThrowError();
    };
    verifyValueThrowsError("string");
    verifyValueThrowsError(null);
    verifyValueThrowsError(undefined);
    verifyValueThrowsError(new Date());
    verifyValueThrowsError(Number.NaN);
  });

  test("assertFiniteNumbers() accepts numeric values", () => {
    const verifyValueIsValid = (value: number) => {
      expect(() => {
        const dataStore = new MultiRegionMultiMetricDataStore({
          region: new MultiMetricDataStore(region, {
            metric: new MetricData(metric, region, value),
          }),
        });
        dataStore.assertFiniteNumbers();
      }).toBeDefined();
    };
    verifyValueIsValid(1);
    verifyValueIsValid(0);
    verifyValueIsValid(-1);
    verifyValueIsValid(0.53217);
  });

  test("regionData() has correct form and throws error if region is missing.", () => {
    const missingRegion = states.findByRegionIdStrict("06");
    const errorMsg = `No data for region ${missingRegion.regionId}. Did you forget to include it when you created the MultiRegionMetricDataStore?`;
    const multiMetricDataStore = new MultiMetricDataStore(region, {
      metric: new MetricData(metric, region, 42),
    });
    const multiRegionMultiMetricDataStore = new MultiRegionMultiMetricDataStore(
      {
        [region.regionId]: multiMetricDataStore,
      }
    );
    expect(multiRegionMultiMetricDataStore.regionData(region)).toEqual(
      multiMetricDataStore
    );
    expect(() => {
      multiRegionMultiMetricDataStore.regionData(missingRegion);
    }).toThrow(errorMsg);
  });
});
