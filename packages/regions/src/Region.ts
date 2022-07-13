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
   * Generates a slug from the input string by replacing accented characters
   * with their basic Latin equivalents, replacing whitespaces with underscores
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

  static urlJoin(...urlParts: string[]): string {
    assert(urlParts.length > 0, `URL parts should have elements`);
    return normalize(urlParts);
  }
}

// https://github.com/jfromaniello/url-join/blob/main/lib/url-join.js
function normalize(strArray: string[]): string {
  const resultArray = [];
  if (strArray.length === 0) {
    return "";
  }

  if (typeof strArray[0] !== "string") {
    throw new TypeError("Url must be a string. Received " + strArray[0]);
  }

  // If the first part is a plain protocol, we combine it with the next part.
  if (strArray[0].match(/^[^/:]+:\/*$/) && strArray.length > 1) {
    strArray[0] = strArray.shift() + strArray[0];
  }

  // There must be two or three slashes in the file protocol, two slashes in anything else.
  if (strArray[0].match(/^file:\/\/\//)) {
    strArray[0] = strArray[0].replace(/^([^/:]+):\/*/, "$1:///");
  } else {
    strArray[0] = strArray[0].replace(/^([^/:]+):\/*/, "$1://");
  }

  for (let i = 0; i < strArray.length; i++) {
    let component = strArray[i];

    if (typeof component !== "string") {
      throw new TypeError("Url must be a string. Received " + component);
    }

    if (component === "") {
      continue;
    }

    if (i > 0) {
      // Removing the starting slashes for each component but the first.
      component = component.replace(/^[/]+/, "");
    }
    if (i < strArray.length - 1) {
      // Removing the ending slashes for each component but the last.
      component = component.replace(/[/]+$/, "");
    } else {
      // For the last component we will combine multiple slashes to a single one.
      component = component.replace(/[/]+$/, "/");
    }

    resultArray.push(component);
  }

  let str = resultArray.join("/");
  // Each input component is now separated by a single slash except the possible first plain protocol part.

  // remove trailing slash before parameters or hash
  str = str.replace(/\/(\?|&|#[^!])/g, "$1");

  // replace ? in parameters with &
  const parts = str.split("?");
  str = parts.shift() + (parts.length > 0 ? "?" : "") + parts.join("&");

  return str;
}
