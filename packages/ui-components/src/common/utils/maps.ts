/** Checks if a county or congressional district belongs to a given state */
export function belongsToState(
  countyOrCongressionalDistrictFips: string,
  stateFips: string
) {
  return countyOrCongressionalDistrictFips.substring(0, 2) === stateFips;
}
