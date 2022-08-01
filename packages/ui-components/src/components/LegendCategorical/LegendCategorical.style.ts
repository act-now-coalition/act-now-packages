import { styled } from "../../styles";
import isValidProp from "@emotion/is-prop-valid";

export const Square = styled("div", { shouldForwardProp: isValidProp })<{
  color: string;
}>`
  min-width: 20px;
  height: 20px;
  border-radius: 4px;
  margin-right: ${(props) => props.theme.spacing(1)};
  background-color: ${(props) => props.color};
`;

export const Label = styled("span")`
  line-height: 1.2;
`;
