import { styled } from "../../styles";
import {
  GridRows as VxGridRows,
  GridColumns as VxGridColumns,
} from "@visx/grid";

export const GridRows = styled(VxGridRows)`
  .visx-line {
    stroke: ${({ theme }) => theme.palette.border.default};
  }
`;

export const GridColumns = styled(VxGridColumns)`
  .visx-line {
    stroke: ${({ theme }) => theme.palette.border.default};
  }
`;
