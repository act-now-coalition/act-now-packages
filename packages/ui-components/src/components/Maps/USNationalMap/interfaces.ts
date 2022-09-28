import { Metric } from "@actnowcoalition/metrics";
import { RegionDB } from "@actnowcoalition/regions";
import { RenderMapProps } from "../RenderMapProps";

export interface USNationalMapProps extends RenderMapProps {
  showCounties?: boolean;
}

export interface MetricUSNationalMapProps extends USNationalMapProps {
  metric: Metric | string;
  regionDB: RegionDB;
}
