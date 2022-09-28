import React from "react";
import { TimeseriesChart } from "./TimeseriesChart";
import { MetricTimeseriesChartProps } from "./interfaces";
import { useData } from "../../common/hooks";
import { NonEmptyTimeseries } from "@actnowcoalition/metrics";

export const MetricTimeseriesChart: React.FC<MetricTimeseriesChartProps> = ({
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
    <TimeseriesChart
      width={width}
      height={height}
      timeseries={timeseries as NonEmptyTimeseries<number>}
    />
  );
};
