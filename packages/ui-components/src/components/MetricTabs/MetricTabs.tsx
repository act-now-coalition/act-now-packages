import { useState } from "react";
import React from "react";

import { Stack, Tab, Tabs, Typography } from "@mui/material";

import { assert } from "@actnowcoalition/assert";
import { Metric } from "@actnowcoalition/metrics";
import { Region } from "@actnowcoalition/regions";

import { useMetricCatalog } from "../../components/MetricCatalogContext";
import { MetricLineChart } from "../MetricLineChart";
import { MetricLineThresholdChart } from "../MetricLineThresholdChart";
import { MetricValue } from "../MetricValue";

export interface MetricTabsProps {
  region: Region;
  metrics: Array<Metric> | Array<string>;
  width?: number;
  height?: number;
}

const TabContent = ({ metric, region }: { metric: Metric; region: Region }) => {
  return (
    <Stack spacing={1}>
      <Typography variant="labelLarge" textAlign="left">
        {metric.name}
      </Typography>
      <MetricValue
        metric={metric}
        region={region}
        variant="dataEmphasizedLarge"
      />
      <Typography variant="paragraphSmall" align={"left"}>
        {metric.extendedName}
      </Typography>
    </Stack>
  );
};

export const MetricTabs = ({
  region,
  metrics,
  width = 800,
  height = 450,
}: MetricTabsProps) => {
  assert(metrics.length > 0, "Must have at least one metric to display");
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

  // TODO: configure breakpoints for mobile?
  const numMetrics = resolvedMetrics.length;
  const tabWidth = numMetrics < 3 ? 160 : 108;

  return (
    <Stack spacing={3} width={width}>
      <Tabs
        onChange={(e, v) => handleChange(v)}
        value={selectedTab}
        variant="scrollable"
        scrollButtons={false}
        sx={{ paddingLeft: 4 }}
      >
        {resolvedMetrics.map((metric) => (
          <Tab
            key={`tab-${metric}`}
            value={metric}
            label={<TabContent region={region} metric={metric} />}
            disableRipple={true}
            sx={{
              width: tabWidth,
              alignItems: "flex-start",
            }}
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
