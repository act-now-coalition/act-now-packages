import { Timeseries } from "@actnowcoalition/metrics";
import { ScaleLinear, ScaleTime } from "d3-scale";

export interface MetricChartProps {
  width: number;
  height: number;
  timeseries: Timeseries<number>;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  barOpacity?: number;
  barOpacityHover?: number;
  dateRange: Date[];

  /** d3-scale to transform point dates to pixel positions on the x-axis */
  xScale: ScaleTime<number, number>;

  /** d3-scale to transform point values to pixel positions on the y-axis */
  yScale: ScaleLinear<number, number>;
}
