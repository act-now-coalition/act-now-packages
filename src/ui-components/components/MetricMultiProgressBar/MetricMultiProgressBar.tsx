import React from "react";

import { Skeleton } from "@mui/material";

import { Metric, MultiMetricDataStore } from "../../../metrics";
import { Region } from "../../../regions";
import { useDataForMetrics } from "../../common/hooks";
import {
  BaseMultiProgressBarProps,
  DEFAULT_HEIGHT,
  DEFAULT_WIDTH,
  MultiProgressBar,
} from "../MultiProgressBar";

type MetricProp = Metric | string;

export interface MetricMultiProgressBarProps extends BaseMultiProgressBarProps {
  /*
   * Region represented by the progress bar.
   */
  region: Region;
  /*
   * Array of two metrics represented by the progress bar.
   */
  metrics: [MetricProp, MetricProp];
}

export const MetricMultiProgressBar = ({
  region,
  metrics,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
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
  /**
   * Current metric value for a given region, unformatted.
   */
  currentValue: number;
  /**
   * Formatted metric value.
   */
  label: string;
}

/**
 * `getProgressBarItems` converts data for two metrics into an array of
 * two items formatted to be passed into MultiProgressBar.
 *
 * @param data - A metric data store containing data for multiple metrics for a given region.
 * @param metrics - Array of two metrics to convert into MetricProgressBarItem.
 * @returns Array of two items of metric information formatted for the progress bar.
 */

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
