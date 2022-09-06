import { styled } from "../../styles";
import { TableCellHead, TableCell as BaseTableCell } from "../BaseTable";

export const ColumnHeaderCell = styled(TableCellHead)`
  font-weight: normal;
  vertical-align: bottom;
  background-color: ${({ theme }) => theme.palette.background.default};
`;

export const TableCell = styled(BaseTableCell)`
  background-color: ${({ theme }) => theme.palette.background.default};
  vertical-align: text-top;
  padding: ${({ theme }) => theme.spacing(1.5)};
`;
