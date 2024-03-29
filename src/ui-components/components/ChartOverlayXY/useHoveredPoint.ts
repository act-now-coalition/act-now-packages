import { useState } from "react";

import isNumber from "lodash/isNumber";

import { Timeseries, TimeseriesPoint } from "../../../metrics";
import { ChartOverlayXYProps, HoveredPointInfo } from "./ChartOverlayXY";

/**
 * React hook that keeps track of the point being hovered in a chart. This hook
 * is normally used with ChartOverlayXY. Given a list of timeseries, it returns
 * the handlers onMouseMove, onMouseLeave and `pointInfo`.
 *
 * @example
 * ```tsx
 * const { pointInfo, onMouseMove, onMouseLeave } = useHoveredPoint(timeseriesList);
 *
 * return (
 *   <svg width={width} height={height}>
 *     {timeseriesList.map(timeseries => (
 *       <LineChart timeseries={timeseries} {...} />
 *     ))}
 *     {pointInfo?.point && (
 *       <Tooltip point={pointInfo?.point}>
 *         <CircleMarker />
 *       </Tooltip>
 *     )}
 *     {pointInfo && (
 *       <LineChart
 *         timeseries={timeseriesList[timeseriesIndex]}
 *         strokeWidth={4}
 *       />
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
 * @param timeseriesList - Array of timeseries of points that can be hovered, or undefined.
 * @returns The hovered point information and the `onMouseMove` and `onMouseLeave` callbacks.
 */
export function useHoveredPoint<T>(
  timeseriesList: Timeseries<T>[] | undefined
) {
  const [pointIndex, setPointIndex] = useState<number | null>(null);
  const [timeseriesIndex, setTimeseriesIndex] = useState<number | null>(null);
  const [point, setPoint] = useState<TimeseriesPoint<T> | null>(null);

  const onMouseLeave = () => {
    setPointIndex(null);
    setTimeseriesIndex(null);
    setPoint(null);
  };

  const onMouseMove: ChartOverlayXYProps["onMouseMove"] = ({
    pointIndex,
    timeseriesIndex,
  }: HoveredPointInfo) => {
    if (timeseriesList && isNumber(pointIndex) && isNumber(timeseriesIndex)) {
      setPointIndex(pointIndex);
      setTimeseriesIndex(timeseriesIndex);
      setPoint(timeseriesList[timeseriesIndex].points[pointIndex]);
    }
  };
  const pointInfo = { timeseriesIndex, pointIndex, point };

  return { pointInfo, onMouseMove, onMouseLeave };
}
