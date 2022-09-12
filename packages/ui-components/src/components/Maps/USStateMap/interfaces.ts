import { RenderMapProps } from "../RenderMapProps";
import { Metric } from "@actnowcoalition/metrics";

export interface USStateMapProps extends RenderMapProps {
  stateRegionId: string;
  showCounties?: boolean;
  showBorderingStates?: boolean;
}

export interface MetricUSStateMapProps extends USStateMapProps {
  metric: Metric | string;
}
