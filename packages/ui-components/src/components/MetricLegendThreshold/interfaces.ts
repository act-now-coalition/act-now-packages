import { Metric } from "@actnowcoalition/metrics";

export interface MetricLegendThresholdProps {
  /** Orientation of the bars. */
  orientation: "horizontal" | "vertical";
  /** Metric to display thresholds for. */
  metric: Metric | string;
  /** Whether to show level labels. Does not affect start/endLabels */
  showLabels?: boolean;
  /** Optional label for the left or top side of the thermometer. */
  startLabel?: React.ReactNode;
  /** Optional label for the right or bottom side of the thermometer. */
  endLabel?: React.ReactNode;
  /** Whether or not to display metric name and info. If false, only thermometer is displayed. */
  includeOverview?: boolean;
  /** Border radius of the bars */
  borderRadius?: number;
  /** Width of the bars */
  width?: number;
  /** Height of the bars */
  height?: number;
  /** Optional other props. */
  otherSvgProps?: Omit<
    React.SVGProps<SVGSVGElement>,
    keyof MetricLegendThresholdProps
  >;
}

export interface LevelItem {
  /** Level name (e.g. "High") */
  name: string;
  /** Level color */
  color: string;
  /** Description of the level */
  description: string | undefined;
  /** Formatted value of the threshold at the end of the current level */
  endThreshold?: string;
}
