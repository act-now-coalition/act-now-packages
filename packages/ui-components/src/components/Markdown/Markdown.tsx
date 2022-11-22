import * as React from "react";
import { ReactMarkdownOptions } from "react-markdown/lib/react-markdown";
import { MarkdownBody } from "./Markdown.style";

export const Markdown = ({ children, ...otherProps }: ReactMarkdownOptions) => (
  <MarkdownBody {...otherProps}>{children}</MarkdownBody>
);

export default Markdown;
