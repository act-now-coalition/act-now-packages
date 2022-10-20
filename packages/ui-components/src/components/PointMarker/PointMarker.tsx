import React from "react";
import { CircleMarker } from "./PointMarker.style";

export interface PointMarkerProps {
  /** Position in pixels */
  x: number;
  /** Position in pixels */
  y: number;
  /** Radius of the dot */
  r?: number;
  /** Fill color for the marker */
  fill?: string;
}

/**
 * Circular marker to use in charts.
 */
export const PointMarker = React.forwardRef<SVGCircleElement, PointMarkerProps>(
  ({ x, y, r = 6, fill = "#000" }, ref) => (
    <CircleMarker ref={ref} cx={x} cy={y} r={r} fill={fill} />
  )
);

PointMarker.displayName = "PointMarker";
