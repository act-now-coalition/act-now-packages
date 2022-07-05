import toLower from "lodash/toLower";
import { Region } from "../../Region";
import { County } from "./County";

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

  contains(subregion: Region): boolean {
    if (subregion instanceof County) {
      return subregion.state.regionId === this.regionId;
    }
    return false;
  }
}
