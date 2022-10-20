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

export const PointMarker = ({
  x,
  y,
  r = 6,
  fill = "#000",
}: PointMarkerProps) => <CircleMarker cx={x} cy={y} r={r} fill={fill} />;
