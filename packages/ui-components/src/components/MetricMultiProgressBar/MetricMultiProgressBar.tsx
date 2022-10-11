import React from "react";
import { maxBy } from "lodash";
import { Region } from "@actnowcoalition/regions";
import { Metric } from "@actnowcoalition/metrics";
import { MultiProgressBar } from "../MultiProgressBar";
import { useDataForRegionsAndMetrics } from "../../common/hooks";

export interface MetricMultiProgressBarProps {
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

export const MetricMultiProgressBar: React.FC<MetricMultiProgressBarProps> = ({
  region,
  metrics,
  ...otherProgressBarProps
}) => {
  const { data } = useDataForRegionsAndMetrics([region], metrics, false);

  if (!data) {
    return null;
  }

  const progressBarItems: MetricProgressBarItem[] = metrics.map(
    (metric: Metric | string) => {
      const metricData = data.metricData(region, metric);
      return {
        color: metricData.getColor(),
        currentValue: metricData.currentValue as number, // improve this
        label: metricData.formatValue(),
      };
    }
  );

  const maxValue =
    maxBy(progressBarItems, (item: MetricProgressBarItem) => item.currentValue)
      ?.currentValue ?? 1000; // fix this + how to treat min?

  return (
    <MultiProgressBar
      items={progressBarItems}
      maxValue={maxValue}
      getItemValue={(item) => item.currentValue}
      getItemColor={(item) => item.color}
      getItemLabel={(item) => item.label}
      {...otherProgressBarProps}
    />
  );
};
