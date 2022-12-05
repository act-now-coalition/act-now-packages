import React, { useEffect, useRef } from "react";

import { ExtendedFeature, GeoProjection, geoPath as d3GeoPath } from "d3-geo";

import { stateBorders } from "../../common/geo-shapes";
import { StyledCanvas } from "../../styles/common/Maps.style";

const borderColor = "white";

export interface CanvasMapProps {
  /**
   * Width of the canvas.
   */
  width: number;
  /**
   * Height of the canvas.
   */
  height: number;
  /**
   * Function that returns the fill color for a shape,
   * given the corresponding region's regionId.
   *
   * @param {string} regionId RegionId corresponding to the shape being colored.
   */
  getFillColor: (regionId: string) => string;
  /**
   * Geometric projection used by the map.
   */
  geoProjection: GeoProjection;
  /**
   * Geometric features to render.
   */
  features: ExtendedFeature[];
  /**
   * Function that returns the geoId of a given feature.
   *
   * @param {ExtendedFeature} geo The feature of which we are getting the geoId.
   */
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
