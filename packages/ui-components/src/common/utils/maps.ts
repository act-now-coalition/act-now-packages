import { counties, Region } from "@actnowcoalition/regions";
import {
  Metric,
  MultiRegionMultiMetricDataStore,
} from "@actnowcoalition/metrics";
import keyBy from "lodash/keyBy";

/** Checks if a county or congressional district belongs to a given state */
export function belongsToState(
  countyOrCongressionalDistrictRegionId: string,
  stateRegionId: string
): boolean {
  return (
    countyOrCongressionalDistrictRegionId.substring(0, 2) === stateRegionId
  );
}

/** Returns an array of all counties of a given state */
export function getCountiesOfState(stateRegionId: string): Region[] {
  return counties.all.filter(
    (county) => county.parent?.regionId === stateRegionId
  );
}

interface FillColorForRegionId {
  [regionId: string]: {
    regionId: string;
    fillColor: string;
  };
}

export function generateFillColorMap(
  regions: Region[],
  metric: string | Metric,
  data: MultiRegionMultiMetricDataStore
): FillColorForRegionId {
  const regionIdAndFillColor = regions.map((region) => ({
    regionId: region.regionId,
    fillColor: data.metricData(region, metric).getColor(),
  }));

  return keyBy(regionIdAndFillColor, (item) => item.regionId);
}
