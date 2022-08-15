import { Timeseries } from "./Timeseries";
import { assertDatesHaveNoGaps, rollingAverage } from "./timeseries_utils";

describe("Timeseries utils", () => {
  test("assertDatesHaveNoGaps() rejects timeseries with date gaps", () => {
    // Helper to make a date of the form 2020-03-{day} where day must be <10.
    const d = (day: number) => new Date(`2020-03-0${day}`);
    const mkTs = (dates: Date[]) =>
      new Timeseries(dates.map((date) => ({ date, value: 1 })));
    assertDatesHaveNoGaps(mkTs([]));
    assertDatesHaveNoGaps(mkTs([d(7)]));
    assertDatesHaveNoGaps(mkTs([d(7), d(8)]));
    // NOTE: This intentionally covers the daylight savings change date.
    assertDatesHaveNoGaps(mkTs([d(7), d(8), d(9)]));
    expect(() => assertDatesHaveNoGaps(mkTs([d(7), d(9)]))).toThrowError(
      /Timeseries has gaps/
    );
  });

  test("rollingAverage tests", () => {
    const ts = new Timeseries<number | null>([
      { date: new Date("2020-01-01"), value: 1 },
      { date: new Date("2020-01-02"), value: 2 },
      { date: new Date("2020-01-03"), value: 3 },
      { date: new Date("2020-01-04"), value: null },
      { date: new Date("2020-01-05"), value: 5 },
      { date: new Date("2020-01-06"), value: 0 },
      { date: new Date("2020-01-07"), value: 0 },
    ]);

    const withTrailingZeros = rollingAverage(
      ts,
      /*days=*/ 3,
      /*includeTrailingZeros=*/ true
    );
    expect(withTrailingZeros.dates).toEqual(ts.dates);
    expect(withTrailingZeros.values).toEqual([
      1 / 1,
      (1 + 2) / 2,
      (1 + 2 + 3) / 3,
      null,
      (5 + 3) / 2,
      (0 + 5) / 2,
      (0 + 0 + 5) / 3,
    ]);

    const withoutTrailingZeros = rollingAverage(
      ts,
      /*days=*/ 3,
      /*includeTrailingZeros=*/ false
    );
    expect(withoutTrailingZeros.dates).toEqual(ts.dates);
    expect(withoutTrailingZeros.values).toEqual([
      1 / 1,
      (1 + 2) / 2,
      (1 + 2 + 3) / 3,
      null,
      (5 + 3) / 2,
      null,
      null,
    ]);
  });
});
