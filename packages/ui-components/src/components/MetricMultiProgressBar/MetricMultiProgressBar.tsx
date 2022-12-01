import React from "react";

import { Metric, MultiMetricDataStore } from "@actnowcoalition/metrics";
import { Region } from "@actnowcoalition/regions";

import { useDataForMetrics } from "../../common/hooks";
import {
  BaseMultiProgressBarProps,
  MultiProgressBar,
} from "../MultiProgressBar";

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
  ...otherProgressBarProps
}: MetricMultiProgressBarProps) => {
  const { data } = useDataForMetrics(region, metrics, false);

  if (!data) {
    return null;
  }

  const [firstItem, secondItem] = getProgressBarItems(data, metrics);

  return (
    <MultiProgressBar
      items={[firstItem, secondItem]}
      getItemValue={(item) => item.currentValue}
      getItemLabel={(item) => item.label}
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
