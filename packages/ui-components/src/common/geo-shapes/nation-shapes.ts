import { FeatureCollection, Geometry, MultiLineString } from "geojson";
import { feature, mesh } from "topojson-client";

import { GeometryCollection } from "topojson-specification";
import nationsJSON from "./nations.json";

interface CountryGeoProps {
  iso2code: string;
  endDate: string;
  countryName: string;
  whoStatus: string;
}

interface DisputedGeoProps {
  name: string;
}

type CountriesGeoJson = FeatureCollection<Geometry, CountryGeoProps>;

interface CountriesTopology extends TopoJSON.Topology {
  objects: {
    countries: GeometryCollection<CountryGeoProps>;
    "disputed-areas": GeometryCollection<DisputedGeoProps>;
    "disputed-borders": GeometryCollection<DisputedGeoProps>;
  };
}

function prepareGeoJsonObjects(countriesTopoJson: CountriesTopology): {
  countries: CountriesGeoJson;
  borders: MultiLineString;
  disputedAreas: FeatureCollection<Geometry, DisputedGeoProps>;
  disputedBorders: FeatureCollection<Geometry, DisputedGeoProps>;
} {
  /**
   * TopoJSON files are significantly lighter than their GeoJSON counterparts. In
   * this case, the GeoJSON files provided by WHO are:
   *
   * 26M  countries.geojson
   * 904K disputed-areas.geojson
   * 644K disputed-borders.geojson
   *
   * The countries.json (TopoJSON) file containing the same information is only
   * 3.1M. Here, we reconstruct the GeoJSON objects on the client side to
   * prevent having to load +26M.
   *
   * The operation of reconstructing GeoJSON features is relatively cheap, it
   * consists mostly of sums and multiplications of integers, with lots of these
   * calculations being reused when features share borders.
   */

  // Convert TopoJSON to GeoJSON
  const featureCollection = feature(
    countriesTopoJson,
    countriesTopoJson.objects.countries
  );

  // Compute a MultiLineString to represent the borders between the countries
  const borders = mesh(countriesTopoJson, countriesTopoJson.objects.countries);

  // Filter out expired and excluded features
  const filteredFeatures = featureCollection.features
    .filter((geo) => !isExpiredGeography(geo.properties.endDate))
    .filter((geo) => !isExcludedFromWHOPublications(geo.properties.whoStatus));

  const disputedAreas = feature(
    countriesTopoJson,
    countriesTopoJson.objects["disputed-areas"]
  );

  // Disputed Borders
  const disputedBorders = feature(
    countriesTopoJson,
    countriesTopoJson.objects["disputed-borders"]
  );

  const countries = {
    ...featureCollection,
    features: filteredFeatures,
  };

  return { countries, borders, disputedAreas, disputedBorders };
}

/**
 * Geographies have end dates, this function returns true if the end date
 * of a geography is in the past.
 */
function isExpiredGeography(endDate: string): boolean {
  // try-catch to handle the case where the endDate cannot be parsed as a date
  try {
    const date = new Date(endDate);
    return date < new Date();
  } catch (err) {
    return false;
  }
}

function isExcludedFromWHOPublications(whoStatus: string): boolean {
  return whoStatus.startsWith("Excluded from WHO publications");
}

const nationsJSONTyped = nationsJSON as unknown as CountriesTopology;
export const nationsGeographies = prepareGeoJsonObjects(nationsJSONTyped);
