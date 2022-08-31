import React, { useEffect, useRef } from "react";
import { ExtendedFeature, GeoProjection, geoPath as d3GeoPath } from "d3-geo";
import { StyledCanvas } from "./NewUSNationalMap.style";
import { stateBorders } from "../../../common/geo-shapes";

const borderColor = "black";

const CanvasMap: React.FC<{
  width: number;
  height: number;
  getFillColor: (fipsCode: string) => string;
  geoProjection: GeoProjection;
  features: ExtendedFeature[];
  getGeoId: (geo: ExtendedFeature) => string;
}> = ({ width, height, getFillColor, geoProjection, features, getGeoId }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const path = d3GeoPath(geoProjection, ctx);
        // Render feature shapes and border
        features.forEach((geo) => {
          ctx.strokeStyle = borderColor;
          ctx.lineWidth = 0.5;
          ctx.fillStyle = getFillColor(getGeoId(geo));
          ctx.beginPath();
          path(geo);
          ctx.fill();
          ctx.stroke();
        });
        // State borders
        ctx.lineWidth = 2;
        ctx.strokeStyle = borderColor;
        ctx.beginPath();
        path(stateBorders);
        ctx.stroke();
      }
    }
  });

  return (
    <StyledCanvas
      width={2 * width}
      height={2 * height}
      ref={canvasRef}
      style={{ width, height }}
    />
  );
};

export default CanvasMap;
