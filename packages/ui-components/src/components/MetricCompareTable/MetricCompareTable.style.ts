import { StyledComponent } from "@emotion/styled";
import { LinkBaseProps, Link as MuiLink } from "@mui/material";

import { styled } from "../../styles";
import { TableCell } from "../CompareTable";

// We remove the padding on the table cells to ensure that the
// link they contain covers the entire cell.
export const StyledTableCell = styled(TableCell)`
  padding: 0;
`;

export const StyledLink: StyledComponent<
  Omit<LinkBaseProps, "classes">
> = styled(MuiLink)`
  display: flex;
  padding: ${({ theme }) => theme.spacing(2)};
  text-decoration: none;

  width: 100%;
  height: 100%;
`;
