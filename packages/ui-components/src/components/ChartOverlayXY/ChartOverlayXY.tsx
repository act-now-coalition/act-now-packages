import React, { useMemo } from "react";
import concat from "lodash/concat";
import { ScaleTime, ScaleLinear } from "d3-scale";
import { Group } from "@visx/group";
import { voronoi, VoronoiPolygon } from "@visx/voronoi";
import { Timeseries, TimeseriesPoint } from "@actnowcoalition/metrics";

export interface ChartOverlayXYProps {
  /** List of timeseries */
  timeseriesList: Timeseries<number>[];
  /** Width */
  width: number;
  /** Height */
  height: number;
  /** xScale */
  xScale: ScaleTime<number, number>;
  /** yScale */
  yScale: ScaleLinear<number, number>;
  onMouseMove?: (pointInfo: PointInfo) => void;
  onMouseOut?: () => void;
}

export interface HoverData {
  timeseries: Timeseries<number>;
  point: TimeseriesPoint<number>;
}

/** PointInfo */
export interface PointInfo {
  /** Hovered point */
  point: TimeseriesPoint<number>;
  /** Index of the hovered timeseries */
  timeseriesIndex: number;
  /** Index of the hovered point */
  pointIndex: number;
}

/**
 * Overlay to capture mouse over a point and the neighboring region
 */
export const ChartOverlayXY = ({
  width,
  height,
  xScale,
  yScale,
  timeseriesList,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onMouseMove = () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onMouseOut = () => {},
}: ChartOverlayXYProps) => {
  // Put all the points together in one array. Each pointInfo includes
  // the index of the timeseries it belongs to, and its own index
  // on the corresponding timeseries
  const points: PointInfo[] = getTimeseriesPoints(timeseriesList);

  // The Voronoi polygons are generated from a set of points and a width
  // and height. Each point has a corresponding polygon such that all the
  // points in the polygon are closer to its point than to any other
  // point.
  // Each polygon has the pointInfo attached to it
  const voronoiPolygons = useMemo(() => {
    const voroniLayout = voronoi<PointInfo>({
      x: ({ point }: PointInfo) => xScale(point.date),
      y: ({ point }: PointInfo) => yScale(point.value),
      width,
      height,
    });
    return voroniLayout(points).polygons();
  }, [points, width, height, xScale, yScale]);

  return (
    <Group>
      {voronoiPolygons.map((polygon, polygonIndex) => (
        <VoronoiPolygon
          key={`polygon-${polygonIndex}`}
          polygon={polygon}
          fill="#e3f2fd"
          fillOpacity={0.5}
          stroke="white"
          strokeWidth={2}
          onMouseEnter={() => onMouseMove(polygon.data)}
          onMouseOut={onMouseOut}
        />
      ))}
    </Group>
  );
};

// Generates identifiable points from a list of timeseries
function getTimeseriesPoints(
  timeseriesList: Timeseries<number>[]
): PointInfo[] {
  return timeseriesList.reduce<PointInfo[]>(
    (acc, timeseries, timeseriesIndex) => {
      const pointInfoList: PointInfo[] = timeseries.points.map(
        (point, pointIndex) => ({ point, timeseriesIndex, pointIndex })
      );
      return concat(acc, pointInfoList);
    },
    []
  );
}
