import { Metric } from "@actnowcoalition/metrics";
import { Region } from "@actnowcoalition/regions";
import { BaseChartProps } from "../TimeseriesLineChart";

export interface MetricLineChartProps extends BaseChartProps {
  metric: Metric | string;
  region: Region;
}
