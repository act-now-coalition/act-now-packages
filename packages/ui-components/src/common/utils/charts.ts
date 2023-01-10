import { Metric, NonEmptyTimeseries } from "@actnowcoalition/metrics";

export interface BaseChartProps {
  /**
   * Width of the chart.
   */
  width: number;
  /**
   * Height of the chart.
   */
  height: number;
  /**
   * Top margin of the chart.
   */
  marginTop?: number;
  /**
   * Bottom margin of the chart.
   */
  marginBottom?: number;
  /**
   * Left margin of the chart.
   */
  marginLeft?: number;
  /**
   * Right margin of the chart.
   */
  marginRight?: number;
}

/**
 * `getChartRange` determines the minimum and maximum y-axis value of a chart given a metric and corresponding timeseries data.
 *
 * @param {Metric} metric A metric instance
 * @param {NonEmptyTimeseries<number>} timeseries Non-empty timeseries data for the metric.
 * @returns {[number, number]} [minValue, maxValue]
 */
export function getChartRange(
  metric: Metric,
  timeseries: NonEmptyTimeseries<number>
) {
  const { minValue: minValueTimeseries, maxValue: maxValueTimeseries } =
    timeseries;

  const { minValue: minValueMetric, maxValue: maxValueMetric } = metric;

  // If available, use `minValue` and `maxValue` from the metric definition.
  // Otherwise, use `minValue` and `maxValue` value of the timeseries.
  const minValue = minValueMetric ?? minValueTimeseries;
  const maxValue = maxValueMetric ?? maxValueTimeseries;

  return [minValue, maxValue];
}

// TODO (Pablo): Can we import this from d3-scale-chromatic?
export const schemeCategory10 = [
  "#1f77b4",
  "#ff7f0e",
  "#2ca02c",
  "#d62728",
  "#9467bd",
  "#8c564b",
  "#e377c2",
  "#7f7f7f",
  "#bcbd22",
  "#17becf",
];
