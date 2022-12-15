import React from "react";

import { Skeleton } from "@mui/material";

import { Metric } from "@actnowcoalition/metrics";
import { Region } from "@actnowcoalition/regions";

import { useDataForMetrics } from "../../common/hooks";
import { ErrorBox } from "../ErrorBox";
import { useMetricCatalog } from "../MetricCatalogContext";
import { BaseSparkLineProps, SparkLine } from "../SparkLine";
import { getChartRange } from "../../common/utils/charts";
import { assert } from "@actnowcoalition/assert";

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
  const width = optionalProps.width ?? 150;
  const height = optionalProps.height ?? 50;

  if (error) {
    return (
      // Because the sparklines are too small for much text, we just render a blank box
      <ErrorBox width={width} height={height}>
        {""}
      </ErrorBox>
    );
  } else if (!data) {
    // Render loading placeholder
    return <Skeleton variant="rectangular" width={width} height={height} />;
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

    assert(
      timeseriesLineChart.hasData(),
      `Timeseries line chart cannot be empty`
    );
    const [minValueLineChart, maxValueLineChart] = getChartRange(
      metricLineChart,
      timeseriesLineChart
    );

    assert(
      timeseriesBarChart.hasData(),
      `Timeseries bar chart cannot be empty`
    );
    const [minValueBarChart, maxValueBarChart] = getChartRange(
      metricBarChart,
      timeseriesBarChart
    );

    const minValue = Math.min(minValueLineChart, minValueBarChart);
    const maxValue = Math.max(maxValueLineChart, maxValueBarChart);

    return (
      <SparkLine
        timeseriesLineChart={timeseriesLineChart}
        timeseriesBarChart={timeseriesBarChart}
        minValue={minValue}
        maxValue={maxValue}
        {...optionalProps}
      />
    );
  }
};
