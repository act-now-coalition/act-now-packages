import { ExtendedFeature, GeoProjection, geoPath as d3GeoPath } from "d3-geo";
import React, { useEffect, useRef } from "react";

import { stateBorders } from "../../common/geo-shapes";
import { StyledCanvas } from "../../styles/common/Maps.style";

const borderColor = "white";

export interface CanvasMapProps {
  width: number;
  height: number;
  getFillColor: (regionId: string) => string;
  geoProjection: GeoProjection;
  features: ExtendedFeature[];
  getGeoId: (geo: ExtendedFeature) => string;
}

export const CanvasMap = ({
  width,
  height,
  getFillColor,
  geoProjection,
  features,
  getGeoId,
}: CanvasMapProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const path = d3GeoPath(geoProjection, ctx);
        // Feature shapes and borders
        features.forEach((geo) => {
          const geoId = getGeoId(geo);
          ctx.strokeStyle = borderColor;
          ctx.lineWidth = 1;
          ctx.fillStyle = getFillColor(geoId);
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
