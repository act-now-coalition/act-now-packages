import lowerCase from "lodash/lowerCase";
import deburr from "lodash/deburr";
import { assert } from "@actnowcoalition/assert";

export class Region {
  constructor(
    public readonly regionId: string,
    public readonly fullName: string,
    public readonly shortName: string,
    public readonly abbreviation: string,
    public readonly urlFragment: string,
    public readonly parent: Region | null,
    // TODO: transfrom population into a Metric
    public readonly population: number
  ) {}

  contains(subregion: Region): boolean {
    return subregion.parent?.regionId === this.regionId;
  }

  get relativeUrl(): string {
    return this.parent
      ? Region.urlPathJoin(this.parent.relativeUrl, this.urlFragment)
      : Region.urlPathJoin("/", this.urlFragment);
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
   * Joins url path sections, de-duplicating '/' characters.
   *
   * Note that it doesn't handle the protocol section of a
   * URL well. It preserves initial and final '/'
   *
   * @example
   *
   *   Region.urlPathJoin("/a/", "/b/")     // /a/b/
   *   Region.urlPathJoin("/a/b/", "/c/d")  // /a/b/c/d
   */
  static urlPathJoin(...urlParts: string[]): string {
    assert(urlParts.length > 0, `URL parts should have elements`);
    // Join each part with slash and then replaces any sequence
    // of 2 or more slash characters with a single one.
    return urlParts.join("/").replace(/\/(\/+)/g, "/");
  }
}
