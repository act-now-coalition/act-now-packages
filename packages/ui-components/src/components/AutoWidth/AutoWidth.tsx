import React from "react";

import { ParentSize } from "@visx/responsive";
import isNumber from "lodash/isNumber";

// TODO (Pablo): The intent here is to ensure that the children elements
// have an optional, numeric `width` prop, but the validation doesn't
// seem to be working.
export interface AutoWidthProps {
  /**
   * A single child element that receives an optional `width` prop.
   */
  children: React.ReactElement<{ width?: number }>;
}

/**
 * AutoWidth is a wrapper that takes the width of the
 * parent component and passes it down to the children.
 * Under the hood, it uses `ParentSize` from @visx/responsive.
 *
 * Note: If the child element already has a non-zero `width` property,
 * the `width` property passed down by AutoWidth will not be applied.
 * The child element will only be rendered once the parent has a width greater
 * than 0, in order to prevent from rendering the component too early.
 */

export const AutoWidth = ({ children }: AutoWidthProps) => {
  const child = React.Children.only(children);

  // Return the child if it already has a numeric `width` prop.
  if (isNumber(child.props.width) && child.props.width > 0) {
    return child;
  }

  return (
    <ParentSize>
      {({ width }) => (width > 0 ? React.cloneElement(child, { width }) : null)}
    </ParentSize>
  );
};
