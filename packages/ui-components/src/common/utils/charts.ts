import {
  Metric,
  Timeseries,
  NonEmptyTimeseries,
} from "@actnowcoalition/metrics";

export interface BaseChartProps {
  width: number;
  height: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
}

export function getChartRange(
  metric: Metric,
  timeseries: Timeseries<number> | NonEmptyTimeseries<number>
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
