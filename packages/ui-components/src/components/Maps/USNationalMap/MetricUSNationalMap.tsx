import React from "react";
import { useMetricCatalog } from "../../MetricCatalogContext";
import USNationalMap from "./USNationalMap";
import { defaultWidth } from "../../../common/geo-shapes";
import { Metric } from "@actnowcoalition/metrics";
import { getMetricMapFillColor } from "../../../common/utils/maps";

export interface MetricUSNationalMapProps {
  width: number;
  renderTooltip: (regionId: string) => React.ReactElement | string;
  showCounties?: boolean;
  metric: Metric | string;
}

const MetricUSNationalMap: React.FC<MetricUSNationalMapProps> = ({
  width = defaultWidth,
  renderTooltip,
  showCounties = false,
  metric,
}) => {
  const metricCatalog = useMetricCatalog();

  if (!metricCatalog) {
    return null;
  }

  return (
    <USNationalMap
      width={width}
      renderTooltip={renderTooltip}
      showCounties={showCounties}
      getFillColor={(regionId) =>
        getMetricMapFillColor(metricCatalog, metric, regionId)
      }
    />
  );
};

export default MetricUSNationalMap;
