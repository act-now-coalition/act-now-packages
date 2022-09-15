import React from "react";
import { useMetricCatalog } from "../../MetricCatalogContext";
import { USStateMap } from "./USStateMap";
import { useMetricMapFillColor } from "../../../common/hooks";
import { MetricUSStateMapProps } from "./interfaces";

export const MetricUSStateMap: React.FC<MetricUSStateMapProps> = ({
  metric,
  ...otherProps
}) => {
  const metricCatalog = useMetricCatalog();

  if (!metricCatalog) {
    return null;
  }

  return (
    <USStateMap
      getFillColor={(region) =>
        useMetricMapFillColor(metricCatalog, metric, region)
      }
      {...otherProps}
    />
  );
};
