import isValidProp from "@emotion/is-prop-valid";
import { styled } from "../../styles";
import MuiArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MuiArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

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
