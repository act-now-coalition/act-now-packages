import React, { SVGProps, useId } from "react";

/**
 * RectClipGroup is a helper component that hides the content of its children
 * that renders outside the area defined by its properties.
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
