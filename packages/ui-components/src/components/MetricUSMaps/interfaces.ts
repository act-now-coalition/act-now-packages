import { Metric } from "@actnowcoalition/metrics";
import { RegionDB } from "@actnowcoalition/regions";
import { USNationalMapProps, USStateMapProps } from "../USMaps";

export interface MetricUSNationalMapProps extends USNationalMapProps {
  metric: Metric | string;
  regionDB: RegionDB;
}

export interface MetricUSStateMapProps extends USStateMapProps {
  metric: Metric | string;
  regionDB: RegionDB;
}
