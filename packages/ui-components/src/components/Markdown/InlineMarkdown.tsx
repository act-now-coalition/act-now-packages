import * as React from "react";
import { ReactMarkdownOptions } from "react-markdown/lib/react-markdown";
import { MarkdownBody } from "./Markdown.style";

/** Override 'div' and 'p' components so they just render as fragments. */
const customComponents = {
  div: (props: React.PropsWithChildren<unknown>) => <>{props.children}</>,
  p: (props: React.PropsWithChildren<unknown>) => <>{props.children}</>,
};

const InlineMarkdown: React.FC<ReactMarkdownOptions> = ({
  children,
  className,
  ...otherProps
}) => (
  // If we pass `className` directly to `ReactMarkdown` it'll wrap the rendered
  // markdown in a div which we don't want, so we create our own wrapper span
  // instead.
  <span className={className}>
    <MarkdownBody components={customComponents} {...otherProps}>
      {children}
    </MarkdownBody>
  </span>
);

export default InlineMarkdown;
