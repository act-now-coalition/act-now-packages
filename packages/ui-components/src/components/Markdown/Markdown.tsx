import * as React from "react";

import { MarkdownBody } from "./Markdown.style";
import { ReactMarkdownOptions } from "react-markdown/lib/react-markdown";

export const Markdown = ({ children, ...otherProps }: ReactMarkdownOptions) => (
  <MarkdownBody {...otherProps}>{children}</MarkdownBody>
);

export default Markdown;
