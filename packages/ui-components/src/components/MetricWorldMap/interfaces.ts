import { Metric } from "@actnowcoalition/metrics";
import { RegionDB } from "@actnowcoalition/regions";
import { WorldMapProps } from "../WorldMap";

export interface MetricWorldMapProps extends WorldMapProps {
  metric: Metric | string;
  regionDB: RegionDB;
}
