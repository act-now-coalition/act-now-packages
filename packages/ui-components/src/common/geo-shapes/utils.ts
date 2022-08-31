import { GeometryObject, Topology } from "topojson-specification";
import { feature, mesh } from "topojson-client";
import { ExtendedFeature } from "d3-geo";
import { RegionDB, counties, states, metros } from "@actnowcoalition/regions";
import isNull from "lodash/isNull";

type FeatureCollection = GeoJSON.FeatureCollection<
  GeoJSON.Geometry,
  { name: string; GEOID?: string; STATEFP?: string }
>;

function getGeometryObject(
  topology: Topology,
  objectName: string
): GeometryObject {
  return topology.objects[objectName] as unknown as GeometryObject;
}

export function getGeoShapes(
  topology: Topology,
  objectName: string
): FeatureCollection {
  const objectStates = getGeometryObject(topology, objectName);
  return feature(topology, objectStates) as FeatureCollection;
}

export function getGeoBorders(
  topology: Topology,
  objectName: string
): GeoJSON.Geometry {
  const geoObject = getGeometryObject(topology, objectName);
  return mesh(topology, geoObject) as GeoJSON.Geometry;
}

// Todo (Chelsi) - move to regions package
function isValidGeoidCode(geoId: string): boolean {
  const allUsRegions = new RegionDB([
    ...counties.all,
    ...states.all,
    ...metros.all,
  ]);
  const foundRegion = allUsRegions.findByRegionId(geoId);
  return !isNull(foundRegion);
}

export function excludeTerritories(
  featureCollection: GeoJSON.FeatureCollection,
  getGeoId: (geo: ExtendedFeature) => string
): GeoJSON.FeatureCollection {
  return {
    ...featureCollection,
    features: featureCollection.features.filter((geo) =>
      isValidGeoidCode(getGeoId(geo))
    ),
  };
}
