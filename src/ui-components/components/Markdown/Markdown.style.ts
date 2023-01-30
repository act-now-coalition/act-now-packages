import { lazy } from "react";

import { styled } from "../../styles";

const ReactMarkdown = lazy(() => import("react-markdown"));

export const MarkdownBody = styled(ReactMarkdown)``;
