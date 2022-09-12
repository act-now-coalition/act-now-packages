import React from "react";
import { useMetricCatalog } from "../../MetricCatalogContext";
import { USStateMap } from "./USStateMap";
import { getMetricMapFillColor } from "../../../common/utils/maps";
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
      getFillColor={(regionId) =>
        getMetricMapFillColor(metricCatalog, metric, regionId)
      }
      {...otherProps}
    />
  );
};
