import React from "react";
import { ParentSize } from "@visx/responsive";

export interface AutoWidthProps {
  /** A single child element that receives an optional `width` prop. */
  children: React.ReactElement<{ width?: number }>;
}

/**
 * The `AutoWidth` is a helper component that measures the width of the
 * parent component and passes it down to the children element.
 *
 * If the child element already has a `width` property, the passed property
 * will be preserved. The child component will only be rendered once the
 * parent has been fully measured (width > 0) to prevent from rendering
 * the component too early.
 */
export const AutoWidth = ({ children }: AutoWidthProps) => (
  <ParentSize>
    {({ width: parentWidth }) => {
      const child = React.Children.only(children);
      const width = child.props.width ?? parentWidth;
      return width > 0 ? React.cloneElement(child, { width }) : null;
    }}
  </ParentSize>
);
