import { StyledComponent } from "@emotion/styled";
import { Link, LinkBaseProps } from "@mui/material";

import { styled } from "../../styles";

export const StyledLink: StyledComponent<
  Omit<LinkBaseProps, "classes">
> = styled(Link)`
  text-decoration: none;
`;
