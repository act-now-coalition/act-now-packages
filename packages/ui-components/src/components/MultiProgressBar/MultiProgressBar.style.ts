import { styled } from "../../styles";

export const ProgressBarContainer = styled("div")`
  width: 100%;
  max-width: 350px;
  margin: auto;

  ${({ theme }) => theme.breakpoints.up("sm")} {
    max-width: 288px;
    margin: 0;
  }
`;

export const StyledSvg = styled("svg")`
  width: 100%;
  border: 1px solid grey;
  border-radius: 3px;
`;
