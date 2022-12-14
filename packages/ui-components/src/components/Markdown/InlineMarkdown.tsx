import * as React from "react";

import { ReactMarkdownOptions } from "react-markdown/lib/react-markdown";

import { MarkdownBody } from "./Markdown.style";

// Override `div` and `p` elements so they render as fragments.
const customComponents = {
  div: (props: React.PropsWithChildren<unknown>) => <>{props.children}</>,
  p: (props: React.PropsWithChildren<unknown>) => <>{props.children}</>,
};

/**
 * InlineMarkdown is a implementation of ReactMarkdown that removes the
 * default wrapping `div` injected by ReactMarkdown and replaces it
 * with a `span`.
 * It does so by passing `className` to our wrapping `span`, rather than passing it
 * directly to ReactMarkdown (which would result in the unwanted wrapping `div`).
 */

export const InlineMarkdown = ({
  children,
  className,
  ...otherProps
}: ReactMarkdownOptions) => (
  <span className={className}>
    <MarkdownBody components={customComponents} {...otherProps}>
      {children}
    </MarkdownBody>
  </span>
);
