import { Region } from "../../Region";
import { State } from "./State";

export class County extends Region {
  constructor(
    name: string,
    fipsCode: string,
    population: number,
    public readonly state: State
  ) {
    super(name, fipsCode, population);
  }

  get fullName(): string {
    return `${this.name}, ${this.state.name}`;
  }

  get shortName(): string {
    return `${this.name}, ${this.state.stateCode}`;
  }

  get abbreviation(): string {
    return getAbbreviatedCounty(this.name);
  }

  get relativeUrl(): string {
    return `${this.state.relativeUrl}/county/${this.urlSegment}`;
  }

  get urlSegment(): string {
    return `${Region.toSlug(this.abbreviation)}`;
  }

  contains() {
    return false;
  }
}

/**
 * Shortens the county name by using the abbreviated version of 'county'
 * or the equivalent administrative division.
 */
function getAbbreviatedCounty(fullCountyName: string) {
  if (fullCountyName.includes("Parish"))
    return fullCountyName.replace("Parish", "Par.");
  if (fullCountyName.includes("Borough"))
    return fullCountyName.replace("Borough", "Bor.");
  if (fullCountyName.includes("Census Area"))
    return fullCountyName.replace("Census Area", "C.A.");
  if (fullCountyName.includes("Municipality"))
    return fullCountyName.replace("Municipality", "Mun.");
  if (fullCountyName.includes("Municipio"))
    return fullCountyName.replace("Municipio", "Mun.");
  else return fullCountyName.replace("County", "Co.");
}
