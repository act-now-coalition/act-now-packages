import React from "react";
import { useMetricCatalog } from "../../MetricCatalogContext";
import { USNationalMap } from "./USNationalMap";
import { getMetricMapFillColor } from "../../../common/utils/maps";
import { MetricUSNationalMapProps } from "./interfaces";

export const MetricUSNationalMap: React.FC<MetricUSNationalMapProps> = ({
  metric,
  ...otherProps
}) => {
  const metricCatalog = useMetricCatalog();

  if (!metricCatalog) {
    return null;
  }

  return (
    <USNationalMap
      getFillColor={(regionId) =>
        getMetricMapFillColor(metricCatalog, metric, regionId)
      }
      {...otherProps}
    />
  );
};
