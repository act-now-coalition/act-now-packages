import * as React from "react";
import { MarkdownBody } from "./Markdown.style";
import remarkGfm from "remark-gfm";

/**
 * "className" prop must be added to an element if it is to be used with added styles and without a wrapper.
 * Emotion needs the className prop to identify which element to combine styles for throughout the DOM.
 *
 * More info: https://github.com/emotion-js/emotion/issues/257
 */

const Markdown: React.FC<{ className?: string; body: string }> = ({
  className,
  body,
}) => (
  <MarkdownBody className={className} remarkPlugins={[remarkGfm]}>
    {body}
  </MarkdownBody>
);

export default Markdown;
