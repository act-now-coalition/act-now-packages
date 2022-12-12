import React from "react";

import { Box, Stack, Typography } from "@mui/material";
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

const getMetricId = (metric: Metric) => metric.id;
const getMetricLabel = (metric: Metric) => metric.name;

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

  const [selectedMetric, setSelectedMetric] = useSelectedOption(
    metrics,
    initialMetric,
    getMetricId
  );

  const [
    regionOptions,
    selectedRegionOptions,
    setSelectedRegionOptions,
    selectedRegions,
  ] = useSelectedOptions(regions, initialRegions, getRegionOption);

  const series = getMetricSeries(selectedMetric, selectedRegions);

  return (
    <Stack spacing={2}>
      <Select
        label="Metric"
        options={metrics}
        selectedOption={selectedMetric}
        onSelectOption={setSelectedMetric}
        getValue={getMetricId}
        getLabel={getMetricLabel}
      />
      {/* Time Periods */}
      <MultiSelect
        label="Locations"
        options={regionOptions}
        selectedOptions={selectedRegionOptions}
        onSelectOptions={setSelectedRegionOptions}
      />
      <ParentSize>
        {({ width }) => (
          <>
            {series.length > 0 ? (
              <MetricSeriesChart
                series={series}
                width={width}
                height={500}
                marginRight={160}
                showLabels
              />
            ) : (
              <EmptyState width={width} height={500} />
            )}
          </>
        )}
      </ParentSize>
    </Stack>
  );
};

const EmptyState = ({ width, height }: { width: number; height: number }) => (
  <Box sx={{ width, height, display: "grid", placeItems: "center" }}>
    <Typography variant="labelSmall" component="div">
      Please select at least one location
    </Typography>
  </Box>
);
