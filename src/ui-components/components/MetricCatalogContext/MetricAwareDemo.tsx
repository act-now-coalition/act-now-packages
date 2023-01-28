import React from "react";

import { Stack, Typography } from "@mui/material";
import { Metric } from "src/metrics";
import { Region } from "src/regions";

import { useData } from "../../common/hooks";
import { useMetricCatalog } from "./MetricCatalogContext";

const MetricAwareDemo = ({
  metric: metricOrId,
  region,
}: {
  metric: Metric | string;
  region: Region;
}) => {
  // Access the metric catalog from the context
  const metricCatalog = useMetricCatalog();

  // Metric instance from the catalog (or from the props)
  const metric = metricCatalog.getMetric(metricOrId);

  // Get data from the metric catalog
  const { data, error } = useData(region, metric, /*includeTimeseries=*/ false);

  // The component needs to handle error and loading states
  if (error || !data) {
    return <>{error ? `${error}` : "..."}</>;
  }

  return (
    <Stack sx={{ p: 2, borderRadius: 0.5 }}>
      <Typography variant="labelLarge">{metric.name}</Typography>
      <Typography variant="dataEmphasizedLarge">
        {metric.formatValue(data.currentValue)}
      </Typography>
      <Typography variant="paragraphSmall">{metric.extendedName}</Typography>
    </Stack>
  );
};

export default MetricAwareDemo;
