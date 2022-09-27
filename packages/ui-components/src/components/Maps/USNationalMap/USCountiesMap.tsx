import React, { useEffect, useRef } from "react";
import { ExtendedFeature, GeoProjection, geoPath as d3GeoPath } from "d3-geo";
import { StyledCanvas } from "../Maps.style";
import { countiesGeographies, stateBorders } from "../../../common/geo-shapes";

const borderColor = "white";

export interface USCountiesMapProps {
  width: number;
  height: number;
  getFillColor: (regionId: string) => string;
  geoProjection: GeoProjection;
  getGeoId: (geo: ExtendedFeature) => string;
}

export const USCountiesMap: React.FC<USCountiesMapProps> = ({
  width,
  height,
  getFillColor,
  geoProjection,
  getGeoId,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const path = d3GeoPath(geoProjection, ctx);
        // Feature shapes and borders
        countiesGeographies.features.forEach((geo) => {
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
    <foreignObject width={width} height={height}>
      <StyledCanvas
        width={2 * width}
        height={2 * height}
        ref={canvasRef}
        style={{ width, height }}
      />
    </foreignObject>
  );
};
