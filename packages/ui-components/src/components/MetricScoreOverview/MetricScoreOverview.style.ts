import { styled } from "../../styles";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export const Container = styled("div")`
  max-width: 240px;
`;

export const StyledInfoIcon = styled(InfoOutlinedIcon)`
  color: #5f6c72;
  cursor: default;
  margin-left: 0.5rem;
  height: 19px;
  width: 19px;

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: rgb(0, 95, 204) 1px auto;
  }
`;
