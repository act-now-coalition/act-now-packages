import isValidProp from "@emotion/is-prop-valid";

import { styled } from "../../styles";

export const StyledCanvas = styled("canvas")`
  pointer-events: none;
`;

export const MapContainer = styled("div", {
  shouldForwardProp: isValidProp,
})<{
  height?: number;
}>`
  position: relative;
  display: flex;
  justify-content: center;
  height: ${({ height }) => (height ? `${height}px` : "100%")};
`;

export const PositionAbsolute = styled("div")`
  position: absolute;
`;

export const RegionShapeBase = styled("path")`
  stroke: ${(props) => props.theme.palette.common.white};
  stroke-width: 1;
`;

export const RegionOverlay = styled("path")`
  fill: ${(props) => props.theme.palette.common.white};
  fill-opacity: 0;
  cursor: pointer;
  &:hover {
    fill-opacity: 0.3;
    stroke: ${(props) => props.theme.palette.common.white};
  }
`;

export const BorderingRegion = styled(RegionShapeBase)`
  fill: ${(props) => props.theme.palette.grey[300]};
  cursor: pointer;
  &:hover {
    fill: ${(props) => props.theme.palette.grey[400]};
  }
`;

export const HighlightableShape = styled("path", {
  shouldForwardProp: isValidProp,
})<{
  highlight: boolean;
}>`
  stroke: ${(props) => (props.highlight ? "black" : "white")};
  stroke-width: ${(props) => (props.highlight ? "4" : "1")};
`;
