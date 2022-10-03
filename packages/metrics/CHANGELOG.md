# @actnowcoalition/metrics

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
