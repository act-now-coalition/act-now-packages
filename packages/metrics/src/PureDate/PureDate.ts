import { assert } from "@actnowcoalition/assert";

export class PureDate {
  readonly jsDate: Date;

  constructor(date: Date | string) {
    const jsDate = typeof date === "string" ? new Date(date) : date;
    assert(
      PureDate.isValid(jsDate),
      `Invalid PureDate contains timestamp: ${date}`
    );
    this.jsDate = jsDate;
  }

  static isValid(jsDate: Date): boolean {
    return jsDate.toISOString().endsWith("T00:00:00.000Z");
  }

  get next(): PureDate {
    return this.addDays(1);
  }

  get prev(): PureDate {
    return this.addDays(-1);
  }

  addDays(days: number): PureDate {
    const newDate = new Date(this.jsDate);
    newDate.setUTCDate(newDate.getUTCDate() + days);
    return new PureDate(newDate);
  }

  subtract(other: PureDate): number {
    // HACK: We use Math.round() which allows us to not worry about daylight saving time.
    return Math.round(
      (this.jsDate.getTime() - other.jsDate.getTime()) / (1000 * 3600 * 24)
    );
  }

  toString(): string {
    return this.jsDate.toISOString().replace(/T.*/, "");
  }
}
