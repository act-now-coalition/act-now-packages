import React from "react";

import { Stack } from "@mui/material";
import { ParentSize } from "@visx/responsive";

import { Metric } from "@actnowcoalition/metrics";
import { Region } from "@actnowcoalition/regions";

import { useMetricCatalog } from "../MetricCatalogContext";
import { MetricSeriesChart } from "../MetricSeriesChart";
import { MultiSelect, useSelectedOptions } from "../MultiSelect";
import { Select, SelectOption, useSelectedOption } from "../Select";
import { getMetricSeries } from "./utils";

export interface MultiRegionMultiMetricChartProps {
  /* List of regions to show in the locations dropdown */
  regions: Region[];
  /** List of metrics to show in the metrics dropdown */
  metrics: (Metric | string)[];
  /* Initially selected metrics */
  initialMetric: Metric | string;
  /* Initially selected regions */
  initialRegions: Region[];
}

function getMetricOption(metric: Metric): SelectOption {
  return { value: metric.id, label: metric.name };
}

function getRegionOption(region: Region): SelectOption {
  return { value: region.regionId, label: region.shortName };
}

export const MultiRegionMultiMetricChart = ({
  regions,
  metrics: metricsOrIds,
  initialMetric: initialMetricOrId,
  initialRegions,
}: MultiRegionMultiMetricChartProps) => {
  const metricCatalog = useMetricCatalog();
  const metrics = metricsOrIds.map((m) => metricCatalog.getMetric(m));
  const initialMetric = metricCatalog.getMetric(initialMetricOrId);

  const [metricOptions, selectedMetricOption, onSelectMetric, selectedMetric] =
    useSelectedOption(metrics, initialMetric, getMetricOption);

  const [
    regionOptions,
    selectedRegionOptions,
    setSelectedRegions,
    selectedRegions,
  ] = useSelectedOptions(regions, initialRegions, getRegionOption);

  const series = getMetricSeries(selectedMetric, selectedRegions);

  return (
    <Stack spacing={2}>
      <Select
        label="Metric"
        options={metricOptions}
        selectedOption={selectedMetricOption}
        onSelectOption={onSelectMetric}
      />
      {/* Time Periods */}
      <MultiSelect
        label="Locations"
        options={regionOptions}
        selectedOptions={selectedRegionOptions}
        onSelectOptions={setSelectedRegions}
      />
      <ParentSize>
        {({ width }) => (
          <MetricSeriesChart
            series={series}
            width={width}
            height={500}
            marginRight={160}
            showLabels
          />
        )}
      </ParentSize>
    </Stack>
  );
};
