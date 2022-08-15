# @actnowcoalition/metrics

> Classes for representing metrics and loading metric data

## Installing

```sh
yarn add @actnowcoalition/metrics
```

## Design Overview / Usage

### Main classes

The metrics package contains a few key classes:

- **Metric** — defines a metric (name, references to data sources, etc.)
- **MetricCatalog** — catalog of metrics
- **MetricDataProvider** — Base class for writing custom data providers to fetch data from a custom data source.
- **MetricData** — data for 1 metric for 1 region
  - **MultiMetricDataStore** — data for 1+ metrics for 1 region
  - **MultiRegionMultiMetricDataStore** — data for 1+ metrics for 1+ regions

### Metrics

`Metric` objects are created from a pure JSON metric definition, so that they can be easily populated from a CMS.

```
const def = {
  id: MetricIds.THE_ANSWER,
  name: "Answer to life, the universe, and everything",
  ...
}

const metric = new Metric(def)
```

There are a variety of options to configure how metrics behave including grading, formatting, etc.

```
{
  id: "cases-per-100k"
  name: "Cases per 100k",
  levelSet: "cases-levels", // references a set of levels defined on the catalog.
  thresholds: [10, 200], // thresholds for grading to specified levels.
  formatOptions: {
    maximumFractionDigits: 1,
  }
}
```

### Metric Data References

A `Metric` just defines the metric via metadata. It doesn’t contain actual metric data. It _does_ contain a `dataReference` that indicates _how_ to fetch data for the metric.

```
{
  id: MetricIds.THE_ANSWER,
  name: "Answer to life, the universe, and everything",
  dataReference: {
    providerId: "static",
    value: 42,
  },
},
```

More on data providers below.

### MetricCatalog

`MetricCatalog` is the central metrics object, akin to `RegionsDB`. An app will have exactly one `MetricCatalog`.
It consists of metric definitions and the data providers to fetch data for the metrics.

```
const dataProviders = [new StaticValueDataProvider()];
const metrics = [
  {
    id: "the_answer",
    name: "Answer to life, the universe, and everything",
    dataReference: {
      providerId: "static",
      value: 42,
    },
  }];

const catalog = new MetricCatalog(
  metrics,
  dataProviders
);
```

### Metric Data

Data can be fetched from `MetricCatalog` using async fetch methods or react hooks.

Data can be fetched with different granularity depending on the use case (a single metric value, a metric chart, a compare table, etc.) - `MetricData` — data for 1 metric for 1 region - `MultiMetricDataStore` — data for 1+ metrics for 1 region - `MultiRegionMultiMetricDataStore` — data for 1+ metrics for 1+ regions

```
// Fetch data for one metric / region, with an async fetch method.
const metricData = await catalog.fetchData(region, metric);

// Use data for many metrics and regions via a React hook.
const multiRegionMultiMetricDataStore = catalog.useDataForRegionsAndMetrics([region, ...], [metric, ...]);
```

### Metric Data: Generics

Since metric data could be numeric, string, boolean, etc, MetricData is generic (`MetricData<T>`, `MultiMetricDataStore<T>`, etc.).

Initially fetched metric data is `MetricData<unknown>` and you'll need to check / validate its type before using it. For example after fetching data you can _assert_ that it is numeric and convert to `MetricData<number>`:

```
const metricData = await catalog.fetchData(region, metric).assertFiniteNumbers();
const value = metricData.currentValue; // value is number | null
const value = metricData.currentValueStrict; // value is number
```

### Custom data providers

You can write custom data providers (e.g. for a weather API) by extending `MetricDataProvider`.

```
export class WeatherAPIDataProvider extends MetricDataProvider {
  constructor() {
    super(/*providerId=*/"weather-api");
  }

  async fetchData(
    regions: Region[],
    metrics: Metric[],
    includeTimeseries: boolean
  ): Promise<MultiRegionMultiMetricDataStore<unknown>> {
    // ... fetch data for regions and metrics and return it.
  }
}
```

When a metric references a data provider, it can contain arbitrary fields for the data provider to use when fetching the data.

```
const metric = [
  {
    id: "temperature_today",
    name: "Today's temperature",
    dataReference: {
      providerId: "weather-api",
      measure: "temperature",
      units: "fahrenheit"
    },
  }];
```

Regardless of where the data comes from (custom provider or builtin), you access it the same way.

```
const metric = "temperature_today";
const metricData = await metricCatalog.fetchData(region, metric);
```

## TODO

- [ ] Write some default data providers (CSVDataProvider, etc.)
- [ ] Add metric legends.
- [ ] Create some default metrics (pi, answer to life, etc.).
- [ ] Add assertString() helpers similar to assertFiniteNumbers()
- [ ] Add minValue / maxValue to metrics.
- [ ] Right now we fetch data based on regions, metrics, and an includeTimeseries flag but we might need more granular control (including timeseries for some metrics but not others, or only fetching part of the timeseries).
- [ ] Consider adding provenance to MetricData and/or source annotations to Metric/MetricDefinition.

## License

[MIT](./LICENSE)
