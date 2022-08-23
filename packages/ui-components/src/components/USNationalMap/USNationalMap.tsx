import React, { useMemo } from "react";
import { states } from "@actnowcoalition/regions";
import keyBy from "lodash/keyBy";
import Tooltip from "@mui/material/Tooltip";
import { geoAlbersUsaTerritories } from "geo-albers-usa-territories";
import { ComposableMap, Geographies } from "react-simple-maps";
import { statesGeographies } from "../../common/shapefiles";
import CountiesMap from "./CountiesMap";
import { StateGeoPath } from "./USNationalMap.style";

export interface USNationalMapProps {
  renderTooltip: (fips: string) => React.ReactElement | string;
  getFillColor?: (fips: string) => string;
  showCounties?: boolean;
}

const projection = geoAlbersUsaTerritories().scale(1070).translate([400, 250]);
const stateFipsCodes = Object.keys(
  keyBy(states.all, (state) => state.regionId)
);

const USNationalMap: React.FC<USNationalMapProps> = ({
  getFillColor,
  renderTooltip,
  showCounties = false,
}) => {
  const regionGeographies = useMemo(() => {
    return (
      <>
        <Geographies geography={statesGeographies}>
          {({ geographies }) =>
            geographies
              .filter((geo) => stateFipsCodes.includes(geo.id))
              .map((geo) => {
                const fipsCode = geo.id;
                const stateRegion = states.findByRegionIdStrict(fipsCode);
                const stateName = stateRegion.fullName;

                const geography = (
                  <StateGeoPath
                    key={fipsCode}
                    geography={geo}
                    /* If we are rendering counties, we do not color the state shapes */
                    fill={
                      !getFillColor || showCounties
                        ? "white"
                        : getFillColor(geo.id)
                    }
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
        {showCounties && <CountiesMap getFillColor={getFillColor} />}
      </>
    );
  }, [getFillColor]);

  return (
    <ComposableMap projection={projection} height={500}>
      {regionGeographies}
    </ComposableMap>
  );
};

export default USNationalMap;
