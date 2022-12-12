import React, { useState } from "react";

import { Box, Stack, Typography } from "@mui/material";
import { ParentSize } from "@visx/responsive";

import { Metric } from "@actnowcoalition/metrics";
import { Region } from "@actnowcoalition/regions";

import { BaseChartProps } from "../../common/utils/charts";
import { useMetricCatalog } from "../MetricCatalogContext";
import { MetricSeriesChart } from "../MetricSeriesChart";
import { MultiSelect } from "../MultiSelect";
import { Select, useSelect } from "../Select";
import { TimePeriod, getDefaultTimePeriods, getMetricSeries } from "./utils";

export interface MultiRegionMultiMetricChartProps extends BaseChartProps {
  /* List of regions to show in the locations dropdown */
  regions: Region[];
  /** List of metrics to show in the metrics dropdown */
  metrics: (Metric | string)[];
  /* Initially selected metrics */
  initialMetric: Metric | string;
  /* Initially selected regions */
  initialRegions: Region[];
  /** Time Periods */
  timePeriods?: TimePeriod[];
  /** default Time period */
  initialTimePeriod?: TimePeriod;
}

const getMetricId = (metric: Metric) => metric.id;
const getMetricLabel = (metric: Metric) => metric.name;

const getRegionLabel = (region: Region) => region.shortName;
const getRegionValue = (region: Region) => region.regionId;

const getPeriodLabel = (period: TimePeriod) => period.label;

export const MultiRegionMultiMetricChart = ({
  regions,
  metrics: metricsOrIds,
  initialMetric: initialMetricOrId,
  initialRegions,
  timePeriods,
  initialTimePeriod,
  height = 500,
  marginRight = 160,
  ...otherBaseChartProps
}: MultiRegionMultiMetricChartProps) => {
  const metricCatalog = useMetricCatalog();
  const metrics = metricsOrIds.map((m) => metricCatalog.getMetric(m));
  const initialMetric = metricCatalog.getMetric(initialMetricOrId);

  const [selectedMetric, setSelectedMetric] = useSelect(
    metrics,
    initialMetric,
    getMetricId
  );

  const periods = timePeriods ?? getDefaultTimePeriods(new Date());
  const defaultPeriod = initialTimePeriod ?? periods[periods.length - 1];

  const [selectedPeriod, setSelectedPeriod] = useSelect(
    periods,
    defaultPeriod,
    getPeriodLabel
  );

  const [selectedRegions, setSelectedRegions] = useState(initialRegions);

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
      <Select
        label="Past number of days"
        options={periods}
        selectedOption={selectedPeriod}
        onSelectOption={setSelectedPeriod}
        getLabel={getPeriodLabel}
        getValue={getPeriodLabel}
      />
      <MultiSelect
        label="Locations"
        options={regions}
        selectedOptions={selectedRegions}
        onSelectOptions={setSelectedRegions}
        getLabel={getRegionLabel}
        getValue={getRegionValue}
      />
      <ParentSize>
        {({ width }) => (
          <>
            {series.length > 0 ? (
              <MetricSeriesChart
                {...otherBaseChartProps}
                series={series}
                width={otherBaseChartProps.width ?? width}
                height={height}
                marginRight={marginRight}
                dateRange={selectedPeriod.dateRange}
                showLabels
              />
            ) : (
              <EmptyState width={width} height={height} />
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
