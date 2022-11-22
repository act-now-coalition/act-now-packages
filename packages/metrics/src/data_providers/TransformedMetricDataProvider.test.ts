import { Region, states } from "@actnowcoalition/regions";

import { TransformedMetricDataProvider } from "./TransformedMetricDataProvider";
import { Metric } from "../Metric";
import { MetricData } from "../data";
import { MetricCatalog } from "../MetricCatalog";
import { StaticValueDataProvider } from "./StaticValueDataProvider";

const testRegion = states.findByRegionIdStrict("53"); // Washington.

enum ProviderId {
  STATIC = "static",
  INVERT_DATA = "invert-data",
}

// An implementation of TransformedMetricDataProvider that transforms numbers
// into their additive inverses (e.g. 5 => -5).
class InvertDataProvider extends TransformedMetricDataProvider {
  constructor(readonly id: string) {
    super();
  }

  transformData(
    sourceData: MetricData,
    transformedMetric: Metric,
    region: Region
  ): MetricData<unknown> {
    const ts = sourceData.timeseries;
    // invert the values.
    const newTs = ts.assertFiniteNumbers().mapValues((v) => -v);
    return new MetricData(
      transformedMetric,
      region,
      newTs.last?.value ?? null,
      newTs
    );
  }
}

enum MetricId {
  PI = "pi",
  ANSWER = "answer",
  INVERTED_PI = "inverted-pi",
  INVERTED_ANSWER = "inverted-answer",
}

const testMetrics = [
  {
    id: MetricId.PI,
    dataReference: {
      providerId: ProviderId.STATIC,
      value: Math.PI,
    },
  },
  {
    id: MetricId.ANSWER,
    dataReference: {
      providerId: ProviderId.STATIC,
      value: 42,
    },
  },
  {
    id: MetricId.INVERTED_PI,
    dataReference: {
      providerId: ProviderId.INVERT_DATA,
      sourceMetric: MetricId.PI,
    },
  },
  {
    id: MetricId.INVERTED_ANSWER,
    dataReference: {
      providerId: ProviderId.INVERT_DATA,
      sourceMetric: MetricId.ANSWER,
    },
  },
];

describe("TransformedMetricDataProvider", () => {
  test("fetches and transforms data", async () => {
    const dataProviders = [
      new StaticValueDataProvider(ProviderId.STATIC),
      new InvertDataProvider(ProviderId.INVERT_DATA),
    ];
    const catalog = new MetricCatalog(testMetrics, dataProviders, states);

    const data = await catalog.fetchDataForMetrics(
      testRegion,
      [MetricId.INVERTED_ANSWER, MetricId.INVERTED_PI],
      /*includeTimeseries=*/ true
    );
    const invertedPi = data.metricData(MetricId.INVERTED_PI);
    expect(invertedPi.currentValue).toBe(-Math.PI);
    expect(invertedPi.timeseries.values).toStrictEqual([-Math.PI]);
    const invertedAnswer = data.metricData(MetricId.INVERTED_ANSWER);
    expect(invertedAnswer.currentValue).toBe(-42);
    expect(invertedAnswer.timeseries.values).toStrictEqual([-42]);
  });
});
