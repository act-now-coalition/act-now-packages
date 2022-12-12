import isValidProp from "@emotion/is-prop-valid";
import MuiArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MuiArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { styled } from "../../../styles";

export const ArrowUpIcon = styled(MuiArrowUpIcon, {
  shouldForwardProp: isValidProp,
})<{ active: boolean }>`
  color: ${({ active, theme }) =>
    active ? theme.palette.common.black : theme.palette.border.default};
`;

export const ArrowDownIcon = styled(MuiArrowDownIcon, {
  shouldForwardProp: isValidProp,
})<{ active: boolean }>`
  color: ${({ active, theme }) =>
    active ? theme.palette.common.black : theme.palette.border.default};
`;
