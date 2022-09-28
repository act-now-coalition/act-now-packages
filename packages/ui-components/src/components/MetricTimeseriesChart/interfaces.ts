import { NonEmptyTimeseries } from "@actnowcoalition/metrics";
import { Metric } from "@actnowcoalition/metrics";
import { Region } from "@actnowcoalition/regions";

interface BaseChartProps {
  width: number;
  height: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
}

export interface TimeseriesChartProps extends BaseChartProps {
  timeseries: NonEmptyTimeseries<number>;
}

export interface MetricTimeseriesChartProps extends BaseChartProps {
  metric: Metric | string;
  region: Region;
}
