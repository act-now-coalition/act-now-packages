import { Link as MuiLink } from "@mui/material";
import { TableCell } from "../CompareTable";
import { styled } from "../../styles";

// We remove the padding on the table cells to ensure that the link they
// contain covers the entire cell.
export const StyledTableCell = styled(TableCell)`
  padding: 0;
`;

export const StyledLink = styled(MuiLink)`
  display: flex;
  padding: ${({ theme }) => theme.spacing(2)};
  text-decoration: none;

  width: 100%;
  height: 100%;
`;
