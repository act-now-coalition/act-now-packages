import React, { useRef } from "react";
import { Group } from "@visx/group";
import { useSvgBBox } from "../../common/hooks";
import { StyledText } from "./BoxedAnnotation.style";

export interface BoxedAnnotationProps {
  /** Position */
  x: number;
  /** Position */
  y: number;
  /** Text */
  text: string;
  /** Optional padding */
  padding?: number;
  /** Text Props */
  textProps?: React.SVGProps<SVGTextElement>;
  /** Box props */
  rectProps?: React.SVGProps<SVGRectElement>;
}

/**
 * This component renders text within a rectangle. In SVG, the size of a text
 * element is known only at rendering time, so we need to measure and update
 * the width and height of the rectangle.
 *
 * The coordinates (x, y) correspond to the position of the text element in its
 * SVG context. Note that the alignment of the text relative to (x, y) depends on
 * the style properties `text-anchor` and `dominant-baseline`, which allows us
 * to use this component and control alignment with styled components. See
 * `TextAnnotation` and `RegionAnnotation` in `Charts.style.ts` for examples.
 */
export const BoxedAnnotation = ({
  x,
  y,
  text,
  padding = 2,
  textProps = {},
  rectProps = {},
}: BoxedAnnotationProps) => {
  const textRef = useRef<SVGTextElement>(null);
  const { top, left, height, width } = useSvgBBox(textRef);

  return (
    <Group left={x} top={y}>
      <rect
        y={top - padding}
        x={left - padding}
        width={Math.abs(width + 2 * padding)}
        height={Math.abs(height + 2 * padding)}
        rx={3}
        ry={3}
        fill="#fff"
        {...rectProps}
      />
      <StyledText ref={textRef} {...textProps}>
        {text}
      </StyledText>
    </Group>
  );
};
