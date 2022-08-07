import { MetricCatalog } from "./MetricCatalog";
import { StaticValueDataProvider } from "../data/StaticValueDataProvider";

describe("MetricCatalog", () => {
  test("smoke test", () => {
    const dataProviders = [new StaticValueDataProvider()];

    enum MetricIds {
      THE_ANSWER = "the-answer",
      PI = "pi",
    }

    new MetricCatalog(
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
      dataProviders
    );
  });
});
