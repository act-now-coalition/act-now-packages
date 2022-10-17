import React from "react";
import { Region } from "@actnowcoalition/regions";
import { Metric, MultiMetricDataStore } from "@actnowcoalition/metrics";
import {
  MultiProgressBar,
  BaseMultiProgressBarProps,
} from "../MultiProgressBar";
import { useDataForMetrics } from "../../common/hooks";

type MetricProp = Metric | string;

export interface MetricMultiProgressBarProps extends BaseMultiProgressBarProps {
  /* Region for which to chart */
  region: Region;
  /* Metrics (2) of which the progress bar will chart current values */
  metrics: [MetricProp, MetricProp];
}

interface MetricProgressBarItem {
  currentValue: number;
  label: string;
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

  const [firstMetric, secondMetric] = metrics;

  return (
    <MultiProgressBar
      items={[
        getItemFromMetricData(data, firstMetric),
        getItemFromMetricData(data, secondMetric),
      ]}
      getItemValue={(item) => item.currentValue}
      getItemLabel={(item) => item.label}
      {...otherProgressBarProps}
    />
  );
};

function getItemFromMetricData(
  data: MultiMetricDataStore,
  metric: MetricProp
): MetricProgressBarItem {
  const metricData = data.metricData(metric);
  return {
    currentValue: metricData.currentValue as number, // improve this
    label: metricData.formatValue(),
  };
}
