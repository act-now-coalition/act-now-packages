import React from "react";
import { Region } from "@actnowcoalition/regions";
import { Metric } from "@actnowcoalition/metrics";
import {
  MultiProgressBar,
  BaseMultiProgressBarProps,
} from "../MultiProgressBar";
import { useDataForMetrics } from "../../common/hooks";

export interface MetricMultiProgressBarProps extends BaseMultiProgressBarProps {
  /* Region for which to chart */
  region: Region;
  /* Metrics of which the progress bar will chart current values */
  metrics: (Metric | string)[];
  /* All props below - MultiProgressBar props to pass down */
  width?: number;
  height?: number;
  bgColor?: string;
  borderRadius?: number;
}

interface MetricProgressBarItem {
  currentValue: number;
  color: string;
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

  const progressBarItems: MetricProgressBarItem[] = metrics.map(
    (metric: Metric | string) => {
      const metricData = data.metricData(metric);
      return {
        color: metricData.getColor(),
        currentValue: metricData.currentValue as number, // improve this
        label: metricData.formatValue(),
      };
    }
  );

  return (
    <MultiProgressBar
      items={progressBarItems}
      getItemValue={(item) => item.currentValue}
      getItemColor={(item) => item.color}
      getItemLabel={(item) => item.label}
      {...otherProgressBarProps}
    />
  );
};
