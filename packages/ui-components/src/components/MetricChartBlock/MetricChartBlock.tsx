import { useState } from "react";
import React from "react";

import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Stack, Typography } from "@mui/material";

import { assert } from "@actnowcoalition/assert";
import { Metric } from "@actnowcoalition/metrics";
import { Region } from "@actnowcoalition/regions";

import { useMetricCatalog } from "../MetricCatalogContext";
import { MetricLineChart } from "../MetricLineChart";
import { MetricLineThresholdChart } from "../MetricLineThresholdChart";
import { MetricValue } from "../MetricValue";
import { MetricTab } from "./MetricChartBlock.style";

export interface MetricChartBlockProps {
  /**
   * Region to display metrics for.
   */
  region: Region;
  /**
   * Metrics to display for tabs and charts.
   */
  metrics: Array<Metric | string>;
  /**
   * Width of the chart block.
   */
  width?: number;
  /**
   * Height of the chart block.
   */
  height?: number;

  /**
   * Function that returns footer content (e.g. explanatory text, share buttons,
   * etc.) to be displayed under the chart for a given metric.
   *
   * @param metric Metric for which to render footer content.
   * @returns Footer content to render.
   */
  renderChartFooter?: (metric: Metric) => React.ReactNode;
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
  renderChartFooter = () => null,
}: MetricChartBlockProps) => {
  assert(metrics.length > 1, "Must have at least 2 tabs to select from");
  const metricCatalog = useMetricCatalog();
  const resolvedMetrics = metrics.map((metric) =>
    metricCatalog.getMetric(metric)
  );
  const [selectedTab, setSelectedTab] = useState<string>(resolvedMetrics[0].id);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };

  const selectedMetric = metricCatalog.getMetric(selectedTab);
  const MetricChart =
    selectedMetric.hasCategories && selectedMetric.categoryThresholds
      ? MetricLineThresholdChart
      : MetricLineChart;

  return (
    <Stack spacing={2} width={width}>
      <TabContext value={selectedTab}>
        <TabList
          onChange={handleChange}
          variant="scrollable"
          scrollButtons={false}
          sx={{ paddingLeft: 4 }}
        >
          {resolvedMetrics.map((metric) => {
            return (
              <MetricTab
                disableRipple={true}
                key={metric.id}
                value={metric.id}
                label={<TabContent metric={metric} region={region} />}
              />
            );
          })}
        </TabList>
        {resolvedMetrics.map((metric) => {
          return (
            <TabPanel key={metric.id} value={metric.id}>
              <MetricChart
                metric={metric}
                region={region}
                width={width}
                height={height}
              />
              <Box width={width} mt={3}>
                {renderChartFooter(metric)}
              </Box>
            </TabPanel>
          );
        })}
      </TabContext>
    </Stack>
  );
};
