import deburr from "lodash/deburr";
import words from "lodash/words";

export abstract class Region {
  constructor(
    public readonly name: string,
    public readonly regionId: string,
    public readonly population: number
  ) {}

  abstract get fullName(): string;
  abstract get shortName(): string;
  abstract get abbreviation(): string;
  abstract get relativeUrl(): string;
  abstract get urlSegment(): string;

  abstract contains(subregion: Region): boolean;

  toString() {
    return `${this.name} (regionId=${this.regionId})`;
  }

  static toSlug(name: string): string {
    return words(deburr(name)).join("_").toLowerCase();
  }

  // toJSON
  // fromJSON
}
