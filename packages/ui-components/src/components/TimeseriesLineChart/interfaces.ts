import { NonEmptyTimeseries } from "@actnowcoalition/metrics";

export interface BaseChartProps {
  width: number;
  height: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
}

export interface TimeseriesLineChartProps extends BaseChartProps {
  timeseries: NonEmptyTimeseries<number>;
}
