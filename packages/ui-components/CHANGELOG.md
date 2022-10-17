# @actnowcoalition/ui-components

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
