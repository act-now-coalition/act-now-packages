# @actnowcoalition/metrics

## 0.4.0

### Minor Changes

- d69f828: Add JSON record data provider

### Patch Changes

- ecbedde: implement import sorting
- Updated dependencies [ecbedde]
  - @actnowcoalition/number-format@0.1.2
  - @actnowcoalition/regions@0.1.2
  - @actnowcoalition/time-utils@0.1.1

## 0.3.4

### Patch Changes

- 65b7b91: Export DataRow type for use with parseCsv() and generateCsv().

## 0.3.3

### Patch Changes

- 6b1f290: Give SimpleMetricDataProviderBase access to the MetricCatalog.
- 2b7fbe9: Add parseCsv() and generateCsv() helpers to the metrics package.
- 79ce3cb: Add ability to simulate data fetching errors and delays.
- 317d58e: CSVDataProvider: Fix handling of missing values in CSV files.
- f48b6f8: CSVMetricDataProvider: Log warning if there are any unknown region IDs. Throw error if they're all unknown.

## 0.3.2

### Patch Changes

- efda932: Fix #242: Drop timeseries data if it wasn't asked for.
- c3f6117: Use p-limit for throttling CAN API requests more elegantly.
- 49ad7c8: Fix #241 (CAN data provider caching) and rework CachingMetricDataProviderBase.
- ba11492: Clean up fetch logic and use p-retry for retries.

## 0.3.1

### Patch Changes

- 7be2ca4: Fix #322: Require passing provider ids to all metric data providers.
- bde5c85: Fix #316: Disallow null and undefined in timeseries.
- ece28df: Fix a bug that caused correctly sorted thresholds to be incorrectly detected as unsorted

## 0.3.0

### Minor Changes

- 048949d: Unify metric categories and levels.

## 0.2.4

### Patch Changes

- b5d8928: Better error messages when thresholds and levels are incompatible
- Updated dependencies [c6e34c7]
  - @actnowcoalition/number-format@0.1.1

## 0.2.3

### Patch Changes

- 1fa74a3: Fix issue with useData() hooks crashing when you change the regions / metrics you're using from one call of the hook to the next.
- a7a4188: Fix JSON fetching when not all fields are present

## 0.2.2

### Patch Changes

- 3286d2e: Add parallelization and retries to CovidActNowDataProvider.

## 0.2.1

### Patch Changes

- 282e765: Remove null values from timeseries fetched from CSV or CAN.

## 0.2.0

### Minor Changes

- 7d4bd88: Change the default for includeTimeseries to false when fetching data and fix the MetricCompareTable, MetricDot, and MetricValue to not fetch timeseries.

## 0.1.1

### Patch Changes

- a342e24: Add node-fetch dependency so that metrics can be fetched from node.js apps.
- 464f4a4: Avoid re-fetching CSV files when a fetch is already in progress.
- Updated dependencies [e8f6d2b]
  - @actnowcoalition/regions@0.1.1

## 0.1.0

### Minor Changes

- 75adbba: Initial version.

### Patch Changes

- Updated dependencies [75adbba]
  - @actnowcoalition/assert@0.1.0
  - @actnowcoalition/number-format@0.1.0
  - @actnowcoalition/regions@0.1.0
  - @actnowcoalition/time-utils@0.1.0
