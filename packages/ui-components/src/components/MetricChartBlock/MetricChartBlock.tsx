import { useState } from "react";
import React from "react";

import { Stack, Tabs, Typography } from "@mui/material";

import { assert } from "@actnowcoalition/assert";
import { Metric } from "@actnowcoalition/metrics";
import { Region } from "@actnowcoalition/regions";

import { useMetricCatalog } from "../MetricCatalogContext";
import { MetricLineChart } from "../MetricLineChart";
import { MetricLineThresholdChart } from "../MetricLineThresholdChart";
import { MetricValue } from "../MetricValue";
import { MetricTab } from "./MetricChartBlock.style";

export interface MetricChartBlockProps {
  region: Region;
  metrics: Array<Metric | string>;
  width?: number;
  height?: number;
}

const TabContent = ({ metric, region }: { metric: Metric; region: Region }) => {
  return (
    <Stack spacing={1}>
      <Typography variant="labelLarge" textAlign="left">
        {metric.name}
      </Typography>
      <MetricValue metric={metric} region={region} />
      <Typography variant="paragraphSmall" align={"left"}>
        {metric.extendedName}
      </Typography>
    </Stack>
  );
};

export const MetricChartBlock = ({
  region,
  metrics,
  width = 800,
  height = 450,
}: MetricChartBlockProps) => {
  assert(metrics.length > 1, "Must have at least 2 tabs to select from");
  const metricCatalog = useMetricCatalog();
  const resolvedMetrics = metrics.map((metric) =>
    metricCatalog.getMetric(metric)
  );
  const [selectedTab, setSelectedTab] = useState<string>(resolvedMetrics[0].id);

  const handleChange = (newValue: string) => {
    setSelectedTab(newValue);
  };

  const selectedMetric = metricCatalog.getMetric(selectedTab);
  const MetricChart =
    selectedMetric.hasCategories && selectedMetric.categoryThresholds
      ? MetricLineThresholdChart
      : MetricLineChart;

  return (
    <Stack spacing={3} width={width}>
      <Tabs
        onChange={(e, v) => handleChange(v)}
        value={selectedMetric}
        variant="scrollable"
        scrollButtons={false}
        sx={{ paddingLeft: 4 }}
      >
        {resolvedMetrics.map((metric) => (
          <MetricTab
            key={`tab-${metric}`}
            value={metric}
            label={<TabContent region={region} metric={metric} />}
            disableRipple={true}
          />
        ))}
      </Tabs>
      <MetricChart
        region={region}
        width={width}
        height={height}
        metric={selectedMetric}
      />
    </Stack>
  );
};
