import React from "react";

import { localPoint } from "@visx/event";
import { ScaleTime } from "d3-scale";

export interface ChartOverlayXProps {
  /** Width of the overlay area */
  width: number;
  /** Height of the overlay area */
  height: number;
  /**
   * Handler to be called when the cursor moves over the overlay. The handler
   * will receive the date being hovered.
   */
  onMouseMove: ({ date }: { date: Date }) => void;
  /** Handler to be called when the cursor leaves the overlay area. */
  onMouseLeave: () => void;
  /** d3-scale to transform between date to pixel units. */
  xScale: ScaleTime<number, number>;
  /** Offset of the overlay relative to the containing SVG element. */
  offset?: number;
}

/**
 * The `ChartOverlayX` component is an invisible overlay that can be used to
 * track the cursor position on a chart, normally to add tooltips or
 * other annotations that depend only on the x-coordinate being hovered.
 *
 * The parent component can have a state variable to store the currently
 * hovered date, and update the date using the onMouseMove and onMouseLeave
 * handlers.
 *
 * @example
 * const Chart = () => {
 *   const [date, setDate] = useState<Date | null>(null);
 *
 *   const onMouseLeave = () => setDate(null);
 *   const onMouseMove = ({ date }: { date: Date }) => setDate(date);
 *
 *   return (
 *     <svg width={width} height={height}>
 *       <Group left={padding} top={padding}>
 *         {date && (
 *           <text x={xScale(date)} y={height / 2}>
 *             {formatUTCDateTime(date, DateFormat.YYYY_MM_DD)}
 *           </text>
 *         )}
 *         <ChartOverlayX
 *           xScale={xScale}
 *           width={innerWidth}
 *           height={innerHeight}
 *           onMouseMove={onMouseMove}
 *           onMouseLeave={onMouseLeave}
 *           offset={padding}
 *         />
 *       </Group>
 *     </svg>
 *   );
 * }
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
