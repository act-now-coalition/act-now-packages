import React from "react";
import { CircleMarker } from "./PointMarker.style";

export interface PointMarkerProps {
  /** Horizontal position, in pixels */
  x: number;
  /** Vertical position, in pixels */
  y: number;
  /** Radius of the circle */
  r?: number;
  /** Fill color for the circle */
  fill?: string;
}

/**
 * Circular marker for points in charts.
 */
export const PointMarker = React.forwardRef<SVGCircleElement, PointMarkerProps>(
  ({ x, y, r = 6, fill = "#000" }, ref) => (
    <CircleMarker ref={ref} cx={x} cy={y} r={r} fill={fill} />
  )
);

PointMarker.displayName = "PointMarker";
