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
   * Generates a slug from the input string by replacing accented characters
   * with their basic Latin equivalents, replacing whitespaces with lodash
   * and splitting words when capitalization changes.
   *
   * @example
   *
   *   Region.toSlug("Río Grande")    // rio_grande
   *   Region.toSlug("DeSoto County") // de_soto_county
   */
  static toSlug(name: string): string {
    return lowerCase(deburr(name)).split(" ").join("_");
  }

  // toJSON
  // fromJSON
}
