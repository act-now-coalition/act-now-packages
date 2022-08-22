import { Geography } from "react-simple-maps";
import { styled } from "../../styles";

export const GeoPath = styled(Geography)`
  fill-opacity: 1;
  /* Prevent focus rectangle appearing on click. */
  outline: none;

  &:hover {
    fill-opacity: 0.7;
  }
`;
