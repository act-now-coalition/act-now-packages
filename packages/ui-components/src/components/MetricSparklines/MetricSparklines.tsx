import { Region } from "@actnowcoalition/regions";
import React from "react";
import { Container } from "./MetricSparklines.style";
import { Metric } from "@actnowcoalition/metrics";
import { SparkLine } from "../SparkLine";
import { useMetricCatalog } from "../MetricCatalogContext";
import { Skeleton } from "@mui/material";

export interface MetricSparklinesProps {
  /** Region to generate sparkline for. */
  region: Region;
  /** Metric to use for line element of sparkline. */
  metricLineChart: Metric | string;
  /** Metric to use for bar elements of sparkline. */
  metricBarChart: Metric | string;
  /** Number of days to show in sparkline, starting from the most recent date looking backwards. */
  numDays: number;
  /** Width of the spark line component. */
  width?: number;
  /** Height of the spark line component. */
  height?: number;
  /** Width of each bar, in pixels. */
  barWidth?: number;
}

export const MetricSparklines: React.FC<MetricSparklinesProps> = ({
  region,
  metricLineChart,
  metricBarChart,
  numDays,
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
  }

  if (data) {
    const timeseriesLineChart = data
      .metricData(metricLineChart)
      ?.timeseries.assertFiniteNumbers()
      .slice(-numDays);
    const timeseriesBarChart = data
      .metricData(metricBarChart)
      ?.timeseries.assertFiniteNumbers()
      .slice(-numDays);
    return (
      <Container>
        <SparkLine
          timeseriesLineChart={timeseriesLineChart}
          timeseriesBarChart={timeseriesBarChart}
          {...optionalProps}
        />
      </Container>
    );
  } else {
    return (
      <Container>
        <Skeleton
          variant="rectangular"
          width={optionalProps.width ?? 150}
          height={optionalProps.height ?? 50}
        />
      </Container>
    );
  }
};
