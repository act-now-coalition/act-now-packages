import {
  GridColumns as VxGridColumns,
  GridRows as VxGridRows,
} from "@visx/grid";

import { styled } from "../../styles";

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
