import { styled } from "../../../styles";

export const StyledCanvas = styled("canvas")`
  pointer-events: none;
`;

export const MapContainer = styled("div")`
  position: relative;
  display: flex;
  justify-content: center;
  height: 100%;
`;

export const PositionAbsolute = styled("div")`
  position: absolute;
`;

export const StateOverlay = styled("path")`
  stroke: ${(props) => props.theme.palette.common.black};
  fill-opacity: 0;
  cursor: pointer;
  &:hover {
    fill: ${(props) => props.theme.palette.common.white};
    fill-opacity: 0.3;
  }
`;

export const StateShape = styled("path")``;