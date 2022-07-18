import lowerCase from "lodash/lowerCase";
import deburr from "lodash/deburr";
import { urlJoin } from "./utils";

export class Region {
  constructor(
    public readonly regionId: string,
    public readonly fullName: string,
    public readonly shortName: string,
    public readonly abbreviation: string,
    public readonly urlFragment: string,
    public readonly parent: Region | null,
    // TODO: transfrom population and potentially other attributes to Metric.
    // This will allow us to leverage on more advanced Metric functionality,
    // such as display sources, number formatting options, etc.
    public readonly population: number
  ) {}

  contains(subregion: Region): boolean {
    return subregion.parent?.regionId === this.regionId;
  }

  get relativeUrl(): string {
    return this.parent
      ? Region.urlJoin(this.parent.relativeUrl, this.urlFragment)
      : Region.urlJoin("/", this.urlFragment);
  }

  toString() {
    return `${this.fullName} (regionId=${this.regionId})`;
  }

  /**
   * Generates a slug from the input string by replacing accented
   * characters with their basic Latin equivalents, replacing whitespaces
   * with underscores and splitting words when capitalization changes.
   *
   * @example
   *
   *   Region.toSlug("Río Grande")    // rio_grande
   *   Region.toSlug("DeSoto County") // de_soto_county
   */
  static toSlug(name: string): string {
    return lowerCase(deburr(name)).split(" ").join("_");
  }

  /**
   * Join URL paths, de-duplicating slash where needed.
   *
   * @example
   *
   *   Region.urlJoin("/a/", "/b/")     // /a/b/
   *   Region.urlJoin("/a/b/", "/c/d")  // /a/b/c/d
   */
  static urlJoin(...urlParts: string[]): string {
    return urlJoin(...urlParts);
  }
}
