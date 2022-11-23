import { useLayoutEffect, useState } from "react";

/**
 * Returns an object with the width, height, top and left client coordinates
 * of the specified SVGGraphicsElement.
 *
 * At rendering time, text elements in SVG don't have a size yet, which makes
 * it difficult to align other elements around them. This hook takes a reference,
 * measures the bounding box of the referenced element and returns its position
 * and size. This allows other elements to use the dimensions of the text element
 * after rendering.
 *
 * @example
 * ```tsx
 * const textRef = useRef(null);
 * const { width, height, top, left } = useSvgBoundingBox(ref);
 *
 * <rect x={top} y={left} width={width} height={height} />
 * <text x={5} y={5} ref={textRef}>svg text</text>
 * ```
 */
export const useSvgBoundingBox = (ref: React.RefObject<SVGGraphicsElement>) => {
  const [box, setBox] = useState({ width: 0, height: 0, top: 0, left: 0 });
  useLayoutEffect(() => {
    if (ref?.current) {
      const { width, height, x, y } = ref.current.getBBox();
      setBox({ width, height, top: y, left: x });
    }
  }, [ref]);

  return box;
};
