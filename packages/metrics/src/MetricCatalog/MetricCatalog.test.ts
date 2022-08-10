import { MetricCatalog } from "./MetricCatalog";
import { StaticValueDataProvider } from "../data/StaticValueDataProvider";
import {
  MultiRegionMultiMetricDataStore,
  SnapshotJSON,
} from "../data/MultiRegionMultiMetricDataStore";
import { states } from "@actnowcoalition/regions";
import { Metric } from "../Metric/Metric";
import { MultiMetricDataStore } from "../data/MultiMetricDataStore";
import { MetricData } from "../data/MetricData";

describe("MetricCatalog", () => {
  const dataProviders = [new StaticValueDataProvider()];
  const region = states.findByRegionIdStrict("12");
  enum MetricIds {
    THE_ANSWER = "the-answer",
  }
  const metricDefinition = {
    id: MetricIds.THE_ANSWER,
    name: "Answer to life, the universe, and everything",
    dataReference: {
      providerId: "static-value",
    },
  };
  const metric = new Metric(metricDefinition);
  const snapshot: SnapshotJSON = {
    metadata: { createdDate: "2022-08-04", latestDate: "2022-08-04" },
    data: {
      12: {
        "the-answer": {
          currentValue: 42,
          timeseriesPoints: [{ date: "2022-08-04", value: 42 }],
        },
      },
    },
  };
  const metricCatalog = new MetricCatalog([metricDefinition], dataProviders, {
    snapshot: snapshot,
  });

  test("fetchDataForMetricsAndRegions() correctly reads from a snapshot.", async () => {
    const multiMetricDataStore = new MultiMetricDataStore(region, {
      [metric.id]: new MetricData(metric, region, 42),
    });
    const multiRegionMultiMetricDataStore = new MultiRegionMultiMetricDataStore(
      { [region.regionId]: multiMetricDataStore }
    );
    expect(
      // TODO: change to fetchData() when it gets implemented and rip out un-needed code above.
      await metricCatalog.fetchDataForMetricsAndRegions(
        [region],
        [metric],
        /*includeTimeseries*/ false
      )
    ).toEqual(multiRegionMultiMetricDataStore);
  });
  test("getMetric() returns correct metric, or throws error for unsupported metric.", () => {
    expect(metricCatalog.getMetric(metric.id)).toStrictEqual(metric);
    expect(() => {
      metricCatalog.getMetric("nothing");
    }).toThrow(`No metric found with id nothing`);
  });
});
