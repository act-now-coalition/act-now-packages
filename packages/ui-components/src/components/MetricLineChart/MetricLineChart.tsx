import React from "react";
import { TimeseriesLineChart } from "./TimeseriesLineChart";
import { MetricLineChartProps } from "./interfaces";
import { useData } from "../../common/hooks";
import { NonEmptyTimeseries } from "@actnowcoalition/metrics";

export const MetricLineChart: React.FC<MetricLineChartProps> = ({
  metric,
  region,
  width,
  height,
}) => {
  const { data } = useData(region, metric, true);

  if (!data) {
    return null;
  }

  const { timeseries } = data;

  if (!timeseries.hasData()) {
    return null;
  }

  return (
    <TimeseriesLineChart
      width={width}
      height={height}
      timeseries={timeseries as NonEmptyTimeseries<number>}
    />
  );
};
