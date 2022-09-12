import { RenderMapProps } from "../RenderMapProps";
import { Metric } from "@actnowcoalition/metrics";

export interface USNationalMapProps extends RenderMapProps {
  showCounties?: boolean;
}

export interface MetricUSNationalMapProps extends USNationalMapProps {
  metric: Metric | string;
}
