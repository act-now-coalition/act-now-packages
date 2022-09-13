import React, { useEffect, useRef } from "react";
import { ExtendedFeature, GeoProjection, geoPath as d3GeoPath } from "d3-geo";
import { StyledCanvas } from "../Maps.style";
import { stateBorders } from "../../../common/geo-shapes";
import {
  Region,
  states,
  metros,
  counties,
  RegionDB,
} from "@actnowcoalition/regions";

const usRegions = new RegionDB([...states.all, ...counties.all, ...metros.all]);

const borderColor = "white";

const CanvasMap: React.FC<{
  width: number;
  height: number;
  getFillColor: (region: Region) => string;
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
        // Feature shapes and borders
        features.forEach((geo) => {
          const geoId = getGeoId(geo);
          const region = usRegions.findByRegionIdStrict(geoId);
          ctx.strokeStyle = borderColor;
          ctx.lineWidth = 1;
          ctx.fillStyle = getFillColor(region);
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
