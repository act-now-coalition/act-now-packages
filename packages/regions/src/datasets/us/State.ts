import toLower from "lodash/toLower";
import { Region } from "../../Region";

export class State extends Region {
  constructor(
    name: string,
    regionId: string,
    population: number,
    public readonly stateCode: string
  ) {
    super(name, regionId, population);
  }

  get fullName(): string {
    return this.name;
  }

  get shortName(): string {
    return this.name;
  }

  get abbreviation(): string {
    return this.stateCode;
  }

  get urlSegment(): string {
    return toLower(`${Region.toSlug(this.name)}-${this.stateCode}`);
  }

  get relativeUrl(): string {
    return `/us/${this.urlSegment}`;
  }

  contains(): boolean {
    // TODO: Implement for counties, metro areas, etc.
    return false;
  }
}
