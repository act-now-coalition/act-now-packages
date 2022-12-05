import React from "react";

import { Skeleton } from "@mui/material";

import { Metric } from "@actnowcoalition/metrics";
import { Region } from "@actnowcoalition/regions";

import { useDataForMetrics } from "../../common/hooks";
import { useMetricCatalog } from "../MetricCatalogContext";
import { BaseSparkLineProps, SparkLine } from "../SparkLine";

export interface MetricSparklinesProps extends BaseSparkLineProps {
  /**
   * Region represented by the sparkline.
   */
  region: Region;
  /**
   * Metric represented by the sparkline's line chart.
   */
  metricLineChart: Metric | string;
  /**
   * Metric represented by the sparkline's bar chart.
   */
  metricBarChart: Metric | string;
  /**
   * Earliest date to be displayed.
   * If undefined, the earliest data point is displayed.
   */
  dateFrom?: Date;
  /**
   * Last date to be displayed.
   * If undefined, the last data point is displayed.
   */
  dateTo?: Date;
}

export const MetricSparklines = ({
  region,
  metricLineChart,
  metricBarChart,
  dateFrom,
  dateTo,
  ...optionalProps
}: MetricSparklinesProps) => {
  const metricCatalog = useMetricCatalog();
  metricLineChart = metricCatalog.getMetric(metricLineChart);
  metricBarChart = metricCatalog.getMetric(metricBarChart);

  const { data, error } = useDataForMetrics(
    region,
    [metricLineChart, metricBarChart],
    /*includeTimeseries=*/ true
  );

  if (error) {
    throw error;
  } else if (!data) {
    // Render loading placeholder
    return (
      <Skeleton
        variant="rectangular"
        width={optionalProps.width ?? 150}
        height={optionalProps.height ?? 50}
      />
    );
  } else {
    // Render Sparkline
    const timeseriesLineChart = data
      .metricData(metricLineChart)
      ?.timeseries.assertFiniteNumbers()
      .filterToDateRange({ startAt: dateFrom, endAt: dateTo });
    const timeseriesBarChart = data
      .metricData(metricBarChart)
      ?.timeseries.assertFiniteNumbers()
      .filterToDateRange({ startAt: dateFrom, endAt: dateTo });

    return (
      <SparkLine
        timeseriesLineChart={timeseriesLineChart}
        timeseriesBarChart={timeseriesBarChart}
        {...optionalProps}
      />
    );
  }
};
