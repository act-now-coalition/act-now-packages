import React, { useMemo } from "react";
import { states } from "@actnowcoalition/regions";
import keyBy from "lodash/keyBy";
import Tooltip from "@mui/material/Tooltip";
import { geoAlbersUsaTerritories } from "geo-albers-usa-territories";
import { ComposableMap, Geographies } from "react-simple-maps";
import stateGeographies from "./shapefiles/states-10m.json";
import { GeoPath } from "./USNationalMap.style";

interface USNationalMapProps {
  renderTooltip: (fips: string) => React.ReactElement | string;
  getGeoFillColor?: (fips: string) => string;
}

const projection = geoAlbersUsaTerritories().scale(1070).translate([400, 250]);
const stateFipsCodes = Object.keys(
  keyBy(states.all, (state) => state.regionId)
);

const USNationalMap = React.memo(
  ({ getGeoFillColor, renderTooltip }: USNationalMapProps) => {
    const regionGeographies = useMemo(() => {
      return (
        <Geographies geography={stateGeographies}>
          {({ geographies }) =>
            geographies
              .filter((geo) => stateFipsCodes.includes(geo.id))
              .map((geo) => {
                const fipsCode = geo.id;
                const stateRegion = states.findByRegionIdStrict(fipsCode);
                const stateName = stateRegion.fullName;

                const geography = (
                  <GeoPath
                    key={fipsCode}
                    geography={geo}
                    fill={getGeoFillColor ? getGeoFillColor(fipsCode) : "white"}
                    stroke="black"
                    strokeOpacity={1}
                    strokeWidth={1}
                    role="img"
                    tabIndex={-1} // TODO: revisit making the map more accessible, for now removing from tab index to avoid a focus trap
                    aria-label={stateName}
                  />
                );

                return (
                  <Tooltip key={fipsCode} title={renderTooltip(fipsCode)}>
                    {geography}
                  </Tooltip>
                );
              })
          }
        </Geographies>
      );
    }, [getGeoFillColor]);

    return (
      <ComposableMap projection={projection} height={500}>
        {regionGeographies}
      </ComposableMap>
    );
  }
);

export default USNationalMap;
