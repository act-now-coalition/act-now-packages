import { useState } from "react";
import isNumber from "lodash/isNumber";

import { Timeseries, TimeseriesPoint } from "@actnowcoalition/metrics";

import { ChartOverlayXYProps, PointInfo } from "./ChartOverlayXY";

export function useHoveredPoint<T>(
  timeseriesList: Array<Timeseries<T>> | undefined
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
  }: PointInfo) => {
    if (timeseriesList && isNumber(pointIndex) && isNumber(timeseriesIndex)) {
      setPointIndex(pointIndex);
      setTimeseriesIndex(timeseriesIndex);
      setPoint(timeseriesList[timeseriesIndex].points[pointIndex]);
    }
  };
  const pointInfo = { timeseriesIndex, pointIndex, point };

  return { pointInfo, onMouseMove, onMouseLeave };
}
