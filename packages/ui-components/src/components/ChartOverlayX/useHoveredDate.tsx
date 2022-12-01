import { useState } from "react";

import { Timeseries, TimeseriesPoint } from "@actnowcoalition/metrics";

import { ChartOverlayXProps } from "./ChartOverlayX";

/**
 * React hook that keeps track of the point being hovered in a chart. This
 * hook is normally used with ChartOverlayX. Given a timeseries, it returns
 * the handlers onMouseMove, onMouseLeave and hoveredPoint, the point in
 * the timeseries closest to the date being hovered.
 *
 * @example
 * ```tsx
 * const { hoveredPoint, onMouseMove, onMouseLeave } = useHoveredDate(timeseries);
 *
 * return (
 *   <svg width={width} height={height}>
 *     <LineChart {...lineChartProps} />
 *     {hoveredPoint && (
 *       <Tooltip point={hoveredPoint}>
 *         <CircleMarker />
 *       </Tooltip>
 *     )}
 *     <ChartOverlayX
 *       onMouseMove={onMouseMove}
 *       onMouseLeave={onMouseLeave}
 *       {...otherProps}
 *     />
 *   </svg>
 * );
 * ```
 *
 * @param timeseries The timeseries with the points being hovered.
 * @returns The hovered point and the onMouseMove and onMouseLeave handlers.
 */
export function useHoveredDate<T>(timeseries: Timeseries<T> | undefined) {
  const [hoveredPoint, setHoveredPoint] = useState<TimeseriesPoint<T> | null>(
    null
  );

  const onMouseLeave = () => setHoveredPoint(null);

  const onMouseMove: ChartOverlayXProps["onMouseMove"] = ({ date }) => {
    if (!timeseries) {
      return;
    }

    const point = timeseries.findNearestDate(date);
    if (point) {
      setHoveredPoint(point);
    }
  };

  return { hoveredPoint, onMouseMove, onMouseLeave };
}
