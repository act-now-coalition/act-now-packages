# @actnowcoalition/metrics

> Classes for representing metrics and loading metric data

## Installing

```sh
yarn add @actnowcoalition/metrics
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
