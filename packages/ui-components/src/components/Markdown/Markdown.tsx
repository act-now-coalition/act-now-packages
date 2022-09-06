import * as React from "react";
import { ReactMarkdownOptions } from "react-markdown/lib/react-markdown";
import { MarkdownBody } from "./Markdown.style";

export const Markdown: React.FC<ReactMarkdownOptions> = ({
  children,
  ...otherProps
}) => <MarkdownBody {...otherProps}>{children}</MarkdownBody>;

export default Markdown;
