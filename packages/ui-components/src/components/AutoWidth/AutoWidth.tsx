import React from "react";
import isNumber from "lodash/isNumber";
import { ParentSize } from "@visx/responsive";

// TODO (Pablo): The intent here is to ensure that the children elements
// have an optional, numeric `width` prop, but the validation doesn't
// seem to be working.
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
export const AutoWidth = ({ children }: AutoWidthProps) => {
  const child = React.Children.only(children);

  // We return the child if it already has a numeric `width` prop.
  if (isNumber(child.props.width)) {
    return child;
  }

  return (
    <ParentSize>
      {({ width }) => (width > 0 ? React.cloneElement(child, { width }) : null)}
    </ParentSize>
  );
};
