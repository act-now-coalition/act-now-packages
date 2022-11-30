import React from "react";
import { Region } from "@actnowcoalition/regions";
import { Metric, MultiMetricDataStore } from "@actnowcoalition/metrics";
import {
  MultiProgressBar,
  BaseMultiProgressBarProps,
} from "../MultiProgressBar";
import { useDataForMetrics } from "../../common/hooks";
import { Skeleton } from "@mui/material";

type MetricProp = Metric | string;

export interface MetricMultiProgressBarProps extends BaseMultiProgressBarProps {
  /* Region for which to chart */
  region: Region;
  /* Metrics (2) of which the progress bar will chart current values */
  metrics: [MetricProp, MetricProp];
}

export const MetricMultiProgressBar = ({
  region,
  metrics,
  width = 100,
  height = 16,
  ...otherProgressBarProps
}: MetricMultiProgressBarProps) => {
  const { data } = useDataForMetrics(region, metrics, false);

  if (!data) {
    return <Skeleton variant="rectangular" width={width} height={height} />;
  }

  const [firstItem, secondItem] = getProgressBarItems(data, metrics);

  return (
    <MultiProgressBar
      items={[firstItem, secondItem]}
      getItemValue={(item) => item.currentValue}
      getItemLabel={(item) => item.label}
      width={width}
      height={height}
      {...otherProgressBarProps}
    />
  );
};

export interface MetricProgressBarItem {
  currentValue: number;
  label: string;
}

function getProgressBarItems(
  data: MultiMetricDataStore,
  metrics: [MetricProp, MetricProp]
): [MetricProgressBarItem, MetricProgressBarItem] {
  const items = metrics.map((metric) => ({
    currentValue: data.metricData(metric).currentValue as number,
    label: data.metricData(metric).formatValue(),
  }));

  return [items[0], items[1]];
}
