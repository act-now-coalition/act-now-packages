import { useState } from "react";

import { Timeseries, TimeseriesPoint } from "@actnowcoalition/metrics";

import { ChartOverlayXProps } from "./ChartOverlayX";

/**
 * React hook that keeps track of the point being hovered in
 * a chart, used in ChartOverlayX. Given a timeseries, it returns
 * the component's `onMouseMove`, `onMouseLeave`, and `hoveredPoint` (the point
 * in the timeseries closest to the date being hovered.
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
 * @param {Timeseries<T> | undefined} timeseries A timeseries of points that can be hovered, or undefined.
 * @returns The hovered point information and the `onMouseMove` and `onMouseLeave` callbacks.
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
