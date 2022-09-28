import { RenderMapProps } from "../RenderMapProps";
import { Metric } from "@actnowcoalition/metrics";
import { Region, RegionDB } from "@actnowcoalition/regions";

export interface USStateMapProps extends RenderMapProps {
  stateRegionId: string;
  currentRegion?: Region;
  showCounties?: boolean;
  showBorderingStates?: boolean;
  getRegionUrl?: (regionId: string) => string | undefined;
}

export interface MetricUSStateMapProps extends USStateMapProps {
  metric: Metric | string;
  regionDB: RegionDB;
}
