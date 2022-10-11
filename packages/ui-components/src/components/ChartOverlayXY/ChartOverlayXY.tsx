import React, { useMemo } from "react";
import concat from "lodash/concat";
import { ScaleTime, ScaleLinear } from "d3-scale";
import { Group } from "@visx/group";
import { voronoi, VoronoiPolygon } from "@visx/voronoi";
import { Timeseries, TimeseriesPoint } from "@actnowcoalition/metrics";

export interface ChartOverlayXYProps {
  /**
   * List of timeseries objects that contain the hoverable points. The component
   * receives a list of timeseries to make it easier to know which series was
   * hovered (not only which point).
   **/
  timeseriesList: Timeseries<number>[];
  /** Width of the hoverable area. */
  width: number;
  /** Height of the hoverable area. */
  height: number;
  /** d3-scale to convert between dates and pixel dimensions. */
  xScale: ScaleTime<number, number>;
  /** d3-scale to convert between data units on the y-axis and pixel dimensions. */
  yScale: ScaleLinear<number, number>;
  /**
   * Handler to call when a user hovers near a point. The point, timeseriesIndex
   * and pointIndex are passed to the handler.
   **/
  onMouseMove?: (pointInfo: PointInfo) => void;
  /** Handler to call when the user moves out of the hoverable area. */
  onMouseOut?: () => void;
}

/**
 * The PointInfo contains information about the point being hovered.
 */
export interface PointInfo {
  /** Hovered point */
  point: TimeseriesPoint<number>;
  /** Index of the hovered timeseries */
  timeseriesIndex: number;
  /** Index of the hovered point */
  pointIndex: number;
}

const noop = () => {
  // Do nothing
};

/**
 * This component is an overlay that helps capture the information of the
 * point that is being hovered by the user. Given a list of timeseries,
 * the `onMouseMove` handler will be called with the point, index of the
 * timeseries (`timeseriesIndex`) and index of the point in the timeseries
 * (`pointIndex`), which can be stored in a state by the parent component.
 *
 * See `ChartOverlayXY.stories.tsx` for usage examples.
 */
export const ChartOverlayXY = ({
  width,
  height,
  xScale,
  yScale,
  timeseriesList,
  onMouseMove = noop,
  onMouseOut = noop,
}: ChartOverlayXYProps) => {
  // Put all the points together in one array. Each pointInfo includes
  // the index of the timeseries it belongs to, and its own index
  // on the corresponding timeseries
  const points: PointInfo[] = getTimeseriesPoints(timeseriesList);

  // The Voronoi polygons are generated from a set of points and a width
  // and height. Each point has a corresponding polygon such that all the
  // points in the polygon are closer to its point than to any other
  // point.
  // Each polygon has the pointInfo attached to it, so we can pass it to the
  // handler when the user hovers it.
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
          fillOpacity={0}
          onMouseEnter={() => onMouseMove(polygon.data)}
          onMouseOut={onMouseOut}
        />
      ))}
    </Group>
  );
};

/**
 * Given a list of timeseries, it returns a single list with the information
 * of each point (point, timeseriesIndex and pointIndex in the timeseries).
 */
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
