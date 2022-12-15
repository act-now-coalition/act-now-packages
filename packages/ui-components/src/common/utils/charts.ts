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

export function getChartRange(
  metric: Metric,
  timeseries: NonEmptyTimeseries<number>
) {
  const { minValue: minValueTimeseries, maxValue: maxValueTimeseries } =
    timeseries;

  const { minValue: minValueMetric, maxValue: maxValueMetric } = metric;

  // If available, use minValue and maxValue from the metric definition.
  // Otherwise, use min and max value of the data.
  const minValue = minValueMetric ?? minValueTimeseries;
  const maxValue = maxValueMetric ?? maxValueTimeseries;

  return { minValue, maxValue };
}
