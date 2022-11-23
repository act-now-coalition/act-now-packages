import isValidProp from "@emotion/is-prop-valid";
import { styled } from "../../styles";

export const Square = styled("div", { shouldForwardProp: isValidProp })<{
  color: string;
}>`
  min-width: 20px;
  height: 20px;
  border-radius: 4px;
  margin-right: ${({ theme }) => theme.spacing(1)};
  background-color: ${(props) => props.color};
`;
