import React from "react";
import { Stack, Typography } from "@mui/material";
import { Metric } from "@actnowcoalition/metrics";
import { Region } from "@actnowcoalition/regions";
import { useMetricCatalog } from "./MetricCatalogContext";

const MetricAwareDemo: React.FC<{
  metric: Metric | string;
  region: Region;
}> = ({ metric: metricOrId, region }) => {
  // Access the metric catalog from the context
  const metricCatalog = useMetricCatalog();

  // Metric instance from the catalog (or from the props)
  const metric = metricCatalog.getMetric(metricOrId);

  // Get data from the metric catalog
  const { data, error } = metricCatalog.useData(region, metric);

  // The component needs to handle error and loading states
  if (error || !data) {
    return <>{error ? `${error}` : "..."}</>;
  }

  return (
    <Stack sx={{ p: 2, backgroundColor: "#fafafa", borderRadius: 0.5 }}>
      <Typography variant="labelLarge">{metric.name}</Typography>
      <Typography variant="dataEmphasizedLarge">
        {metric.formatValue(data.currentValue)}
      </Typography>
      <Typography variant="paragraphSmall">{metric.extendedName}</Typography>
    </Stack>
  );
};

export default MetricAwareDemo;
