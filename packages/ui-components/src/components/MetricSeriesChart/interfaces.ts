import { Metric, TimeseriesPoint } from "@actnowcoalition/metrics";
import { Region } from "@actnowcoalition/regions";
import { LinePathProps } from "@visx/shape/lib/shapes/LinePath";

export enum SeriesType {
  LINE = "LINE",
  LINE_THRESHOLDS = "LINE_THRESHOLDS",
  BAR = "BAR",
}

export interface SeriesBase {
  metric: Metric;
  region: Region;
}

export interface SeriesLine extends SeriesBase {
  type: SeriesType.LINE;
  lineProps?: React.SVGProps<SVGPathElement> &
    LinePathProps<TimeseriesPoint<number>>;
}

export interface SeriesLineThresholds extends SeriesBase {
  type: SeriesType.LINE_THRESHOLDS;
}

export interface SeriesBar extends SeriesBase {
  type: SeriesType.BAR;
}

export type Series = SeriesLine | SeriesLineThresholds | SeriesBar;
