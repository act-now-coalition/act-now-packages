import React, { useMemo } from "react";

import { Group } from "@visx/group";
import { VoronoiPolygon, voronoi } from "@visx/voronoi";
import { ScaleLinear, ScaleTime } from "d3-scale";
import concat from "lodash/concat";

import { Timeseries, TimeseriesPoint } from "@actnowcoalition/metrics";

export interface ChartOverlayXYProps {
  /**
   * Array of timeseries objects that contain the hoverable points. The component
   * receives a list of timeseries to make it easier to know which series was
   * hovered (not only which point).
   **/
  timeseriesList: Timeseries<number>[];
  /**
   * Width of the overlay area.
   */
  width: number;
  /**
   * Height of the overlay area.
   */
  height: number;
  /**
   * d3-scale to convert between date points and pixel positions.
   */
  xScale: ScaleTime<number, number>;
  /**
   * d3-scale to convert between numerical points and pixel positions.
   */
  yScale: ScaleLinear<number, number>;
  /**
   * Callback fired when the cursor moves over the overlay.
   *
   * @param pointInfo - Information about the point being hovered.
   **/
  onMouseMove?: (pointInfo: HoveredPointInfo) => void;
  /**
   * Callback fired when the cursor leaves the overlay area.
   */
  onMouseOut?: () => void;
}

export interface HoveredPointInfo {
  /**
   * Timeseries point being hovered.
   */
  point: TimeseriesPoint<number>;
  /**
   * Index of the timeseries being hovered.
   */
  timeseriesIndex: number;
  /**
   * Index of the point being hovered.
   */
  pointIndex: number;
}

const noop = () => {
  // Do nothing
};

/**
 * ChartOverlayXY is an invisible overlay that captures the information
 * of the point being hovered by the user. Given a list of timeseries,
 * the `onMouseMove` callback will be called with the point, index of the
 * timeseries (`timeseriesIndex`), and index of the point in the timeseries
 * (`pointIndex`), which can be stored by the parent component in a state variable.
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
  const points: HoveredPointInfo[] = getTimeseriesPoints(timeseriesList);

  // The Voronoi polygons are generated from a set of points and a width
  // and height. Each point has a corresponding polygon such that all the
  // points in the polygon are closer to its point than to any other
  // point.
  // Each polygon has the pointInfo attached to it, so we can pass it to the
  // handler when the user hovers it.
  const voronoiPolygons = useMemo(() => {
    const voroniLayout = voronoi<HoveredPointInfo>({
      x: ({ point }: HoveredPointInfo) => xScale(point.date),
      y: ({ point }: HoveredPointInfo) => yScale(point.value),
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
): HoveredPointInfo[] {
  return timeseriesList.reduce<HoveredPointInfo[]>(
    (acc, timeseries, timeseriesIndex) => {
      const pointInfoList: HoveredPointInfo[] = timeseries.points.map(
        (point, pointIndex) => ({ point, timeseriesIndex, pointIndex })
      );
      return concat(acc, pointInfoList);
    },
    []
  );
}
