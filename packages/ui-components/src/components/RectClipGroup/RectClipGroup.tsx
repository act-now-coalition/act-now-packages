import React, { SVGProps, useId } from "react";

/**
 * The RectClipGroup component hides the content of its children that is
 * outside the area defined by its properties.
 *
 * @example
 * ```tsx
 * <svg width={400} height={200}>
 *   <RectClipGroup x={100} width={100} height={100}>
 *     <rect x={0} width={400} height={200} fill="red" />
 *   </RectClipGroup>
 * </svg>
 * ```
 */

export type RectClipGroupProps = SVGProps<SVGRectElement>;

export const RectClipGroup = ({
  children,
  ...rectProps
}: RectClipGroupProps) => {
  const clipPathId = useId();
  return (
    <>
      <defs>
        <clipPath id={clipPathId}>
          <rect {...rectProps} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipPathId})`}>{children}</g>
    </>
  );
};
