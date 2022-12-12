import * as React from "react";

export const DiagonalHatchPattern = ({ lineColor }: { lineColor: string }) => (
  <pattern
    id="diagonalHatch"
    patternUnits="userSpaceOnUse"
    width="2"
    height="2"
    patternTransform="rotate(-45)"
  >
    <line
      x1="0"
      x2="2"
      y1="0.5"
      y2="0.5"
      strokeWidth="0.5"
      stroke={lineColor}
    />
    <line
      x1="0"
      x2="2"
      y1="1.5"
      y2="1.5"
      strokeWidth="0.5"
      stroke={lineColor}
    />
  </pattern>
);
