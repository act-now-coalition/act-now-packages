# @actnowcoalition/ui-components

## 0.11.1

### Patch Changes

- b3ffafb: Improvement to tabs styling
- Updated dependencies [fcf7830]
  - @actnowcoalition/metrics@0.4.2

## 0.11.0

### Minor Changes

- 87e1693: Remove getRegionUrl prop from metric-aware maps

### Patch Changes

- 9f9a8b6: Update `MultiRegionMultiMetricChart` to better support time intervals not based in a number of days.
- c5f5784: Handle no data in metric chart
- 81eb40e: Add a loading state to MetricCompareTable
- ff08c0f: Fix #538: Add a default tooltip for metric maps.
- f3de936: Fix #536: Fix alignment of icon on RegionSearch
- caf8141: Rename MetricTooltip => MetricChartTooltip.
- 2288c51: Ensure metric line threshold chart doesn't hang
- Updated dependencies [2fc0d11]
  - @actnowcoalition/regions@0.1.4

## 0.10.8

### Patch Changes

- a6249ef: Remove no-longer-needed type annotation on StyledLink.
- a66b15d: Make metric legend threshold thermometer more responsive
- 72097a5: Mark the package as side-effects free

## 0.10.7

### Patch Changes

- 60986bf: Upgrade TypeScript and @mui/material
- Updated dependencies [fbe5c14]
- Updated dependencies [60986bf]
  - @actnowcoalition/metrics@0.4.1
  - @actnowcoalition/assert@0.1.2
  - @actnowcoalition/number-format@0.1.3
  - @actnowcoalition/regions@0.1.3

## 0.10.6

### Patch Changes

- b9de1c9: Add @mui/material to peerDependencies

## 0.10.5

### Patch Changes

- 6e2d3af: Remove stories form the npm bundle

## 0.10.4

### Patch Changes

- 31489e8: Fix missing import for fail() in MultiMetricUSStateMap/utils.ts.
- c848045: fix compare table style bug
- bf7b01c: Dark theme styling improvements
- c7e2418: Restore d3-scale-chromatic

## 0.10.3

### Patch Changes

- 9192b1d: Remove d3-scale-chromatic dependency
- ae8e167: Remove width prop from MetricChartBlock and instead size the contained chart automatically.

## 0.10.2

### Patch Changes

- 5087883: Small styling fixes
- dd1dead: Fix import of d3-scale-chromatic

## 0.10.1

### Patch Changes

- 6dc06d9: Add ability to have footer content under metric charts in MetricChartBlock for https://github.com/act-now-coalition/act-now-template/issues/61.
- 3d7f421: Clean up prop documentation cont.
- 82d744d: Adjust padding / width on MetricChartBlock.

## 0.10.0

### Minor Changes

- dc93e72: Improvements to LegendThreshold

### Patch Changes

- 0bd1e50: Adds dialog component
- 3b23bc1: Fix RegionSearch keyboard navigation
- a3e672d: Fixes bug that caused series to be visible outside the charting area'
- 58f7b1b: Add MetricChartBlock component
- 6da39e6: Add abiliity to filter MultiRegionMultiMetricChart by time period
- 7c49294: Adjust minValue and maxValue calculation logic in charts
- b676ad8: Clean up documentation
- feece0f: More improvements to default chart colors
- c9d7730: Implement date filter on MetricSeriesChart
- a8149cd: Create palette story for dark theme and minor dark theme fixes
- 377b405: Implement `Select` and `MultiSelect` components
- 15db70d: Implement MultiRegionMultiMetricChart component

## 0.9.0

### Minor Changes

- ecbedde: simplify various prop interfaces
- 22cc5b8: Removing sortColumnId and sortDirection from CompareTable
- a6fb51d: rename renderTooltip prop to getTooltip

### Patch Changes

- b26d872: Reorganize storybook
- 043296b: Fix #421: Render placeholder text in MetricOverview while waiting for data to load to avoid layout shift.
- 9a483b3: Fix #422: Make MetricMultiProgressBar render Skeleton while data is loading to avoid layout shift.
- e2d92b8: Add default metric format options and decimal points mock data
- fbc8a79: Add disabledBackground theme color and use for loading states.
- 2da2dd6: Add support for labels on MetricSeriesChart
- 564a844: Fixes #450: Adds theming selector to Storybook (and adds an initial dark theme).
- e0fb6de: Fix #418,#419,#420: Better error states for charts, maps, and compare table.
- 6a6cda5: Render Skeleton component in charts while data is loading to avoid layout shift.
- a21eb05: Render map regions in grey while data is loading to avoid layout shifts.
- ecbedde: implement import sorting
- Updated dependencies [d69f828]
- Updated dependencies [ecbedde]
  - @actnowcoalition/metrics@0.4.0
  - @actnowcoalition/number-format@0.1.2
  - @actnowcoalition/regions@0.1.2

## 0.8.2

### Patch Changes

- c771c22: Make sparkline y-axis start from 0 and use dateFrom and dateTo
- 4591d4b: Export SeriesChart types again (got accidentally removed during recent refactoring).
- Updated dependencies [65b7b91]
  - @actnowcoalition/metrics@0.3.4

## 0.8.1

### Patch Changes

- 55a51fb: Fix floating zero on y-axis
- 638b514: Cleanup to syntax and some light file rearranging
- 79ce3cb: Add ability to simulate data fetching errors and delays.
- f48b6f8: CSVMetricDataProvider: Log warning if there are any unknown region IDs. Throw error if they're all unknown.
- 69981bf: Enable chart to accommodate negative values
- Updated dependencies [6b1f290]
- Updated dependencies [2b7fbe9]
- Updated dependencies [79ce3cb]
- Updated dependencies [317d58e]
- Updated dependencies [f48b6f8]
  - @actnowcoalition/metrics@0.3.3

## 0.8.0

### Minor Changes

- 8456ad7: - `MetricSeriesChart` takes `Metric` or `MetricId`
  - The y-axis on `MetricSeriesChart` takes the format of the metrics in the series list
  - The `SeriesLine.lineProps` attribute is now optional

### Patch Changes

- 1ab0527: Resolve unique key warning in World Map component
- be296ed: Fix a timezone issue in charts with a time-based axis'
- 9c50781: Improve implementations of theme colors
- 9aab4e6: Default metric's extended name to empty string

## 0.7.3

### Patch Changes

- 7fb511c: Implement MetricSeriesChart component

## 0.7.2

### Patch Changes

- 133e34b: Implement WorldMap components

## 0.7.1

### Patch Changes

- 5c59c11: Improve responsiveness of maps and legend threshold
- 49ad7c8: Fix #241 (CAN data provider caching) and rework CachingMetricDataProviderBase.
- 6e42bf1: Implement `LineIntervalChart` component
- 344ea7a: Fix the state map for Alaska
- f42cce3: Implement useHoveredPoint hook to use on multi-timeseries charts
- Updated dependencies [efda932]
- Updated dependencies [c3f6117]
- Updated dependencies [49ad7c8]
- Updated dependencies [ba11492]
  - @actnowcoalition/metrics@0.3.2

## 0.7.0

### Minor Changes

- 95cc470: Update RegionSearch to use MuiLink and regionDB

### Patch Changes

- f18427d: Minor improvements to props
- 8d55d2f: Fix US maps to handle when metric data is not available yet.
- 8d55d2f: Create mini map container

## 0.6.1

### Patch Changes

- 4240202: Add back metric-aware maps to the ui-components index

## 0.6.0

### Minor Changes

- d48cf77: Add links to region pages on `MetricCompareTable`

### Patch Changes

- 7be2ca4: Fix #322: Require passing provider ids to all metric data providers.
- 00a645b: The `MetricLineThresholdChart` now shows all the levels
- bde5c85: Fix #316: Disallow null and undefined in timeseries.
- ffe37ea: Rework metric data fetching hooks using SWR. Fixes #315.
- d067060: Reorganize and rename misc files
- b6b3c07: - Add `PointMarker` component and better defaults for `MetricTooltip`
  - Copy `useSvgBBox` hook from CAN
- Updated dependencies [7be2ca4]
- Updated dependencies [bde5c85]
- Updated dependencies [ece28df]
  - @actnowcoalition/metrics@0.3.1

## 0.5.4

### Patch Changes

- 048949d: Unify metric categories and levels.
- Updated dependencies [048949d]
  - @actnowcoalition/metrics@0.3.0

## 0.5.3

### Patch Changes

- b7f86d7: Cleanup for MetricScoreOverview and LegendThreshold
- 0e493bd: Implement MetricLineThresholdChart and useHoveredData hook
- 22430d4: Style bottom axis
- 879b8b5: Add resize observer hook

## 0.5.2

### Patch Changes

- 2099726: Implement ChartOverlayXY component
- ed44577: Add metric aware MultiProgressBar component
- 7359e2b: Style select multiple component
- 3a84a74: Set the minimum width of tooltips to 200px
- a9b444d: MetricLegendThreshold now supports metrics with categories
- 4b9abec: Improvements to multi progress bar
- 1cfe67a: Implement AutoWidth component

## 0.5.1

### Patch Changes

- 799b084: Improve button styling
- d87ac83: Export TableContainer to contain and size compare tables
- cc7af9c: Clip the map extent to fix the tooltip positioning (and more efficient rendering)
- c6e34c7: Update metric compare table: Add metric extended names to column headers; add population to location column.
- c6e34c7: Add formatInteger() overload that takes options and use it from ui-components.
- 0b4e368: Improvements to LegendThreshold components
- Updated dependencies [b5d8928]
- Updated dependencies [c6e34c7]
  - @actnowcoalition/metrics@0.2.4
  - @actnowcoalition/number-format@0.1.1

## 0.5.0

### Minor Changes

- f4a8791: AxisTimeseries now allows custom options for the axis

### Patch Changes

- 9a385e3: Update the number format of the population on RegionSearch options
- 22514ac: Improvements to share buttons
- 1ba706f: Use MuiLinks on StateMap instead of a
- 8ea282b: Style select component
- 4ce47f6: Replace supportingText with just using the extended metric name.
- 6acae4e: Update the MetricLegendThreshold component to show threshold values between labels

## 0.4.3

### Patch Changes

- 1fa74a3: Fix issue with useData() hooks crashing when you change the regions / metrics you're using from one call of the hook to the next.
- Updated dependencies [1fa74a3]
- Updated dependencies [a7a4188]
  - @actnowcoalition/metrics@0.2.3

## 0.4.2

### Patch Changes

- 057a491: Update URL routing for RegionSearch

## 0.4.1

### Patch Changes

- a5df187: Add tooltip and line marker to MetricLineChart
- Updated dependencies [282e765]
  - @actnowcoalition/metrics@0.2.1

## 0.4.0

### Minor Changes

- 2d63116: Add AxesTimeseries component
- a105910: Update the maps to not import regions directly
- 90ae768: Add metric timeseries chart component

### Patch Changes

- ed4c594: Implement ChartOverlayX component
- 359855f: Remove social meta tags

## 0.3.0

### Minor Changes

- 7d4bd88: Change the default for includeTimeseries to false when fetching data and fix the MetricCompareTable, MetricDot, and MetricValue to not fetch timeseries.

### Patch Changes

- Updated dependencies [7d4bd88]
  - @actnowcoalition/metrics@0.2.0

## 0.2.3

### Patch Changes

- 05fa5e7: Implement tabs
- Updated dependencies [e8f6d2b]
- Updated dependencies [a342e24]
- Updated dependencies [464f4a4]
  - @actnowcoalition/regions@0.1.1
  - @actnowcoalition/metrics@0.1.1

## 0.2.2

### Patch Changes

- 0ff0d78: Fix a a bug that prevented the labels to show on LegendThreshold (horizontal)
- e085226: style region search items
- 4926c4c: Implement share button
- da42672: Style the Chip component and minor fixes on theme/components'

## 0.2.1

### Patch Changes

- 2d63a74: Make maps responsive, fix map bug caused by absolute positioning

## 0.2.0

### Minor Changes

- 4e6614d: Update the CompareTable interface and implement MetricCompareTable

### Patch Changes

- 33f5628: Add social meta tags
- d45ee06: Fix coloring functions for metric maps
- 3675bbd: Reverse order of levels in LegendThresholdVertical
- 66978e6: Add MetricScoreOverview component
- 33f5628: Make React and React-dom peer dependencies
- 6cc12ef: Move the apple stock timeseries (for storybook) to an utility file

## 0.1.0

### Minor Changes

- 75adbba: Initial version.

### Patch Changes

- Updated dependencies [75adbba]
  - @actnowcoalition/assert@0.1.0
  - @actnowcoalition/metrics@0.1.0
  - @actnowcoalition/number-format@0.1.0
  - @actnowcoalition/regions@0.1.0
