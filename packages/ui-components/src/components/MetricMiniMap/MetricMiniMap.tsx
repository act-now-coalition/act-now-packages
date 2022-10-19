import React from "react";
import { RegionDB } from "@actnowcoalition/regions";
import { MetricId } from "../../stories/mockMetricCatalog";
import { MetricUSStateMap } from "../Maps";

export interface MetricMiniMapProps {
  stateRegionId: string;
  metric: MetricId;
  regionDB: RegionDB;
  renderTooltip: (regionId: string) => React.ReactElement | string;
}

export const MetricMiniMap: React.FC<MetricMiniMapProps> = ({
  stateRegionId,
  metric,
  regionDB,
  renderTooltip,
}) => {
  return (
    <MetricUSStateMap
      stateRegionId={stateRegionId}
      metric={metric}
      regionDB={regionDB}
      renderTooltip={renderTooltip}
    />
  );
};
