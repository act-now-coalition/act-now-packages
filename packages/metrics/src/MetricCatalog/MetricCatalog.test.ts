import { MetricCatalog } from "./MetricCatalog";
import { StaticValueDataProvider } from "../data/StaticValueDataProvider";
import { SnapshotJSON } from "../data/MultiRegionMultiMetricDataStore";
import { states } from "@actnowcoalition/regions";
import { Metric } from "../Metric/Metric";

describe("MetricCatalog", () => {
  test("smoke test", () => {
    const dataProviders = [new StaticValueDataProvider()];
    const region = states.findByRegionIdStrict("12");
    enum MetricIds {
      THE_ANSWER = "the-answer",
      PI = "pi",
    }
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
    const metricDefinitions = [
      {
        id: MetricIds.THE_ANSWER,
        name: "Answer to life, the universe, and everything",
        dataReference: {
          providerId: "static-value",
          value: 42,
        },
      },
    ];
    const metrics = metricDefinitions.map((metric) => {
      return new Metric(metric);
    });

    const catalog = new MetricCatalog(metricDefinitions, dataProviders, {
      snapshot: snapshot,
    });
    catalog.fetchDataForMetricsAndRegions(
      [region],
      metrics,
      /*includeTimeseries*/ true
    );
  });
});
