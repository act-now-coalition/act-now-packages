import lowerCase from "lodash/lowerCase";
import deburr from "lodash/deburr";

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

  /**
   * - deburr: Replace accents, tilde, punctuation, etc.
   * - lowerCase: Split by capitalization, spaces, punctuation
   */
  static toSlug(name: string): string {
    return lowerCase(deburr(name)).split(" ").join("_");
  }

  // toJSON
  // fromJSON
}
