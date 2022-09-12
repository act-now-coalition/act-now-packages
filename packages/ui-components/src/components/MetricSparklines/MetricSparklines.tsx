import { Region } from "@actnowcoalition/regions";
import React from "react";
import { Metric } from "@actnowcoalition/metrics";
import { SparkLine } from "../SparkLine";
import { useMetricCatalog } from "../MetricCatalogContext";
import { Skeleton } from "@mui/material";
import { SparkLineProps } from "../SparkLine";

export interface MetricSparklinesProps
  extends Omit<SparkLineProps, "timeseriesBarChart" | "timeseriesLineChart"> {
  /** Region to generate sparkline for. */
  region: Region;
  /** Metric to use for line element of sparkline. */
  metricLineChart: Metric | string;
  /** Metric to use for bar elements of sparkline. */
  metricBarChart: Metric | string;
  /** Number of days to show in sparkline, starting from the most recent date looking backwards. */
  numDays: number;
}

export const MetricSparklines: React.FC<MetricSparklinesProps> = ({
  region,
  metricLineChart,
  metricBarChart,
  numDays = 30,
  ...optionalProps
}) => {
  const metricCatalog = useMetricCatalog();
  metricLineChart = metricCatalog.getMetric(metricLineChart);
  metricBarChart = metricCatalog.getMetric(metricBarChart);
  const { data, error } = metricCatalog.useDataForMetrics(region, [
    metricLineChart,
    metricBarChart,
  ]);
  if (error) {
    throw error;
  } else if (!data) {
    // Render loading placeholder.
    return (
      <Skeleton
        variant="rectangular"
        width={optionalProps.width ?? 150}
        height={optionalProps.height ?? 50}
      />
    );
  } else {
    // Render Sparkline.
    const timeseriesLineChart = data
      .metricData(metricLineChart)
      ?.timeseries.assertFiniteNumbers()
      .slice(-numDays);
    const timeseriesBarChart = data
      .metricData(metricBarChart)
      ?.timeseries.assertFiniteNumbers()
      .slice(-numDays);

    return (
      <SparkLine
        timeseriesLineChart={timeseriesLineChart}
        timeseriesBarChart={timeseriesBarChart}
        {...optionalProps}
      />
    );
  }
};
