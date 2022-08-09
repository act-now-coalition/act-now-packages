import { DateRange, Timeseries } from "./Timeseries";

describe("Timeseries", () => {
  test("constructor smoke test", () => {
    const points = [
      {
        date: new Date("2001-02-03"),
        value: 23,
      },
      {
        date: new Date("2001-03-04"),
        value: 51,
      },
    ];
    const ts = new Timeseries<number>(points);
    expect(ts.points).toEqual(points);
  });

  test("constructor requires dates not to have a time component", () => {
    expect(
      () =>
        new Timeseries([
          {
            date: new Date("2021-02-03T01:23:45Z"),
            value: 1,
          },
        ])
    ).toThrowError("Dates in a timeseries must not have a (non-zero) time.");
  });

  test("constructor sorts dates", () => {
    const points = [
      {
        date: new Date("2001-03-04"),
        value: 51,
      },
      {
        date: new Date("2001-02-03"),
        value: 23,
      },
    ];
    const ts = new Timeseries<number>(points);
    expect(ts.points).toEqual([points[1], points[0]]);
  });

  test("fromDateRange() with iteratee", () => {
    const startDate = new Date("2021-01-01");
    const endDate = new Date("2021-01-03");
    const expectedDates = [
      "2021-01-01T00:00:00.000Z",
      "2021-01-02T00:00:00.000Z",
      "2021-01-03T00:00:00.000Z",
    ];
    const values = [1, 2, 3];

    // using values array
    let ts = Timeseries.fromDateRange(startDate, endDate, values);
    expect(ts.dates.map((d) => d.toISOString())).toEqual(expectedDates);
    expect(ts.values).toEqual(values);

    // using value iteratee
    ts = Timeseries.fromDateRange(startDate, endDate, (date, i) => values[i]);
    expect(ts.dates.map((d) => d.toISOString())).toEqual(expectedDates);
    expect(ts.values).toEqual(values);
  });

  test("findNearestDate() finds nearest date", () => {
    const points = [
      {
        date: new Date("2021-02-03"),
        value: 1,
      },
      {
        date: new Date("2021-02-04"),
        value: 1,
      },
    ];
    const ts = new Timeseries(points);
    expect(ts.findNearestDate(new Date("2021-02-02"))).toBe(points[0]);
    expect(ts.findNearestDate(new Date("2021-02-03T11:59:59Z"))).toBe(
      points[0]
    );
    expect(ts.findNearestDate(new Date("2021-02-03T12:00:01Z"))).toBe(
      points[1]
    );
    expect(ts.findNearestDate(new Date("2021-02-05"))).toBe(points[1]);
  });

  test("assertFiniteNumbers() rejects non-numeric values", () => {
    const verifyValueThrowsError = (value: unknown) => {
      expect(() =>
        new Timeseries([
          { date: new Date("2021-02-03"), value },
        ]).assertFiniteNumbers()
      ).toThrowError("Found non-numeric (or non-finite) value in timeseries");
    };
    verifyValueThrowsError("string");
    verifyValueThrowsError(null);
    verifyValueThrowsError(undefined);
    verifyValueThrowsError(new Date());
    verifyValueThrowsError(Number.NaN);
  });

  test("removeNulls() removes nulls and undefined", () => {
    const date = new Date("2021-01-01");
    const ts = new Timeseries<number | null | undefined>([
      { date, value: 1 },
      { date, value: null },
      { date, value: 2 },
      { date, value: undefined },
      { date, value: 3 },
    ]);
    const tsWithoutNulls: Timeseries<number> = ts.removeNils();
    expect(tsWithoutNulls.length).toBe(3);
    expect(tsWithoutNulls.values).toEqual([1, 2, 3]);
  });

  test(`hasData() can be used as a type guard for NonEmptyTimeseries`, () => {
    // This is really a compile-time test rather than run-time.  As long as
    // TypeScript doesn't barf, then we're happy.
    const ts = new Timeseries<number>([]);
    if (ts.hasData()) {
      // Because we checked hasData() first, ts should now be a
      // NonEmptyTimeseries and last() and findNearestDate() should be
      // non-nullable, so TypeScript will let us access `.value` without a null
      // check.
      console.log(ts.last.value);
      console.log(ts.findNearestDate(new Date()).value);
    }
  });

  describe(`filterToDateRange() filters correctly with`, () => {
    // Helper to make a date of the form 2020-01-{day} where day must be <10.
    const d = (day: number) => new Date(`2020-01-0${day}`);

    const dates = [d(1), d(2), d(3), d(4)];
    const ts = new Timeseries(dates.map((date) => ({ date, value: 1 })));

    const verifyRange = (range: DateRange, expectedDates: Date[]) => {
      const newTs = ts.filterToDateRange(range);
      expect(newTs.points.map((p) => p.date)).toEqual(expectedDates);
    };

    test("startAt", () => verifyRange({ startAt: d(2) }, [d(2), d(3), d(4)]));
    test("startAfter", () => verifyRange({ startAfter: d(2) }, [d(3), d(4)]));
    test("endAt", () => verifyRange({ endAt: d(2) }, [d(1), d(2)]));
    test("endBefore", () => verifyRange({ endBefore: d(2) }, [d(1)]));
    test("startAt / endAt", () =>
      verifyRange({ startAt: d(1), endAt: d(2) }, [d(1), d(2)]));
    test("startAt / endBefore", () =>
      verifyRange({ startAt: d(1), endBefore: d(2) }, [d(1)]));
    test("startAfter / endAt", () =>
      verifyRange({ startAfter: d(1), endAt: d(3) }, [d(2), d(3)]));
    test("startAfter / endBefore", () =>
      verifyRange({ startAfter: d(1), endBefore: d(2) }, []));
  });
});
