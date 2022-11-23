import { Menu as MuiMenu, MenuItem as MuiMenuItem } from "@mui/material";

import { styled } from "../../styles";

export const Menu = styled(MuiMenu)`
  .MuiMenu-paper {
    margin-top: ${(props) => props.theme.spacing(1)};
    min-width: 125px;
  }

  .MuiMenu-list {
    padding: 0;
  }

  /* Makes ReactShare buttons full-width */
  button {
    width: 100%;
  }
`;

export const MenuItem = styled(MuiMenuItem)`
  padding: 0;
`;
