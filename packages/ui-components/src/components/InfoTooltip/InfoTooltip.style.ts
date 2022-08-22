import { styled } from "../../styles";
import { Close as MuiCloseIcon } from "@mui/icons-material";

export const CloseIcon = styled(MuiCloseIcon)`
  cursor: pointer;
  width: 20px;
  height: 20px;
  margin-left: auto;
  position: absolute;
  top: 4px;
  right: 4px;

  ${({ theme }) => theme.breakpoints.up("sm")} {
    display: none;
  }
`;
