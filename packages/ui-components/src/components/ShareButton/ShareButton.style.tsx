import { styled } from "../../styles";
import {
  Menu as MuiMenu,
  MenuItem as MuiMenuItem,
  Button as MuiButton,
} from "@mui/material";

export const Menu = styled(MuiMenu)`
  .MuiMenu-paper {
    margin-top: 8px;
    min-width: ${(props) => props.theme.spacing(18)};
  }
  .MuiMenu-list {
    padding: 0;
  }
`;

export const MenuItem = styled(MuiMenuItem)`
  padding: 0;
`;

export const Button = styled(MuiButton)`
  min-height: ${(props) => props.theme.spacing(5)};
`;
