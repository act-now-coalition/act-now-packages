import * as React from "react";
import remarkGfm from "remark-gfm";
import { ReactMarkdownOptions } from "react-markdown/lib/react-markdown";
import { MarkdownBody } from "./Markdown.style";

const Markdown: React.FC<ReactMarkdownOptions> = ({
  children,
  ...otherProps
}) => (
  <MarkdownBody remarkPlugins={[remarkGfm]} {...otherProps}>
    {children}
  </MarkdownBody>
);

export default Markdown;
