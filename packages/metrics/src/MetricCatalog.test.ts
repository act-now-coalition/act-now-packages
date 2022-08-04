import { MetricCatalog } from "./MetricCatalog";
import { StaticValueDataProvider } from "./data/StaticValueDataProvider";
import { SnapshotJSON } from "./data/MultiRegionMultiMetricDataStore";
import { states } from "@actnowcoalition/regions";

describe("MetricCatalog", () => {
  test("smoke test", () => {
    const dataProviders = [new StaticValueDataProvider()];

    enum MetricIds {
      THE_ANSWER = "the-answer",
      PI = "pi",
    }

    const snapshot: SnapshotJSON = {
      metadata: { date: "2022-08-04" },
      data: {
        12: {
          pi: {
            currentValue: 42,
            timeseries: {
              points: [{ date: "2022-08-04", value: 42 }],
            },
          },
        },
      },
    };

    const catalog = new MetricCatalog(
      [
        {
          id: MetricIds.THE_ANSWER,
          name: "Answer to life, the universe, and everything",
          dataReference: {
            providerId: "static-value",
            value: 42,
          },
        },
        {
          id: MetricIds.PI,
          name: "Pi",
          extendedName:
            "Pi - The ratio of a circle's circumference to its diameter",
          dataReference: {
            providerId: "static-value",
            value: 3.141592653589793,
          },
        },
      ],
      dataProviders,
      undefined,
      snapshot
    );
    catalog.fetchData(states.findByRegionIdStrict("12"), "pi");
  });
});
