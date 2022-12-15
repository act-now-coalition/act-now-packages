import React from "react";

import { localPoint } from "@visx/event";
import { ScaleTime } from "d3-scale";

export interface ChartOverlayXProps {
  /**
   * Width of the overlay area.
   */
  width: number;
  /**
   * Height of the overlay area.
   */
  height: number;
  /**
   * Callback fired when the cursor moves over the overlay.
   *
   * @param date - The date being hovered.
   */
  onMouseMove: ({ date }: { date: Date }) => void;
  /**
   * Callback fired when the cursor leaves the overlay area.
   */
  onMouseLeave: () => void;
  /**
   * d3-scale to convert between date points and pixel positions.
   */
  xScale: ScaleTime<number, number>;
  /**
   * Offset of the overlay relative to the containing SVG element.
   * @default 0
   */
  offset?: number;
}

/**
 * ChartOverlayX is an invisible overlay that tracks the cursor
 * position on a chart, often used to add tooltips or other annotations
 * that depend only on the x-coordinate being hovered.
 * The parent component can store the currently hovered date in a state variable,
 * which will be updated using the `onMouseMove` and `onMouseLeave` callbacks.
 */

export const ChartOverlayX = ({
  width,
  height,
  xScale,
  onMouseMove,
  onMouseLeave,
  offset = 0,
}: ChartOverlayXProps) => {
  const handleMouseMove = (
    event: React.MouseEvent<SVGRectElement, MouseEvent>
  ) => {
    const point = localPoint(event);
    const x = point?.x;
    if (x) {
      const date = xScale.invert(x - offset);
      onMouseMove({ date });
    }
  };

  return (
    <rect
      width={width}
      height={height}
      fillOpacity={0}
      onMouseMove={handleMouseMove}
      onMouseLeave={onMouseLeave}
    />
  );
};
