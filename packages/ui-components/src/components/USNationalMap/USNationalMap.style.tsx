import { Geography } from "react-simple-maps";
import { styled } from "../../styles";

export const StateGeoPath = styled(Geography)`
  fill-opacity: 1;
  /* Prevent focus rectangle appearing on click. */
  outline: none;

  &:hover {
    fill-opacity: 0.7;
  }
`;

export const CountyGeoPath = styled(Geography)`
  pointer-events: none;
`;
