import { RenderMapProps } from "../RenderMapProps";
import { Metric } from "@actnowcoalition/metrics";
import { Region, RegionDB } from "@actnowcoalition/regions";

export interface USStateMapProps extends RenderMapProps {
  stateRegionId: string;
  currentRegion?: Region;
  showCounties?: boolean;
  showBorderingStates?: boolean;
}

export interface MetricUSStateMapProps extends USStateMapProps {
  metric: Metric | string;
  regionDB: RegionDB;
}
