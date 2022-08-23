import React from "react";
import keyBy from "lodash/keyBy";
import { Geographies } from "react-simple-maps";
import { useCountyGeographies } from "../../common/shapefiles";
import { CountyGeoPath } from "./USNationalMap.style";
import { counties } from "@actnowcoalition/regions";

const countiesFipsCodes = Object.keys(
  keyBy(counties.all, (county) => county.regionId)
);
const CountiesMap: React.FC<{
  getFillColor?: (fips: string) => string;
}> = ({ getFillColor }) => {
  const { result: allCountiesTopoJson } = useCountyGeographies();

  if (!allCountiesTopoJson) {
    return <g />;
  }

  return (
    <Geographies geography={allCountiesTopoJson}>
      {({ geographies }) =>
        geographies
          .filter((geo) => countiesFipsCodes.includes(geo.id))
          .map((geo) => (
            <CountyGeoPath
              key={geo.id}
              geography={geo}
              fill={getFillColor ? getFillColor(geo.id) : "white"}
              strokeWidth={1}
              stroke="black"
              role="img"
              aria-label={geo.properties.name}
              tabIndex={-1}
            />
          ))
      }
    </Geographies>
  );
};

export default CountiesMap;
