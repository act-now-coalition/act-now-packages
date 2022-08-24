import {
  DateFormat,
  TimeUnit,
  formatDateTime,
  formatUTCDateTime,
  parseDateString,
  parseDateUnix,
  addTime,
  subtractTime,
  getStartOf,
  getTimeDiff,
  isoDateOnlyString,
} from "./index";

/**
 * Helper to create Date instances from a numeric year, month, day, and optional hour and minute.
 *
 * This mostly exists because the Date constructor expects 0-indexed months,
 * which is pretty unnatural.
 *
 * @param year Numeric year (e.g. 2020)
 * @param month The 1-indexed month (e.g. 3 for March)
 * @param day 1-indexed day (e.g. 25 for the 25th of March)
 * @param hour 1-indexed hour (e.g. 13 for 1 pm.)
 * @param minute 1-indexed minute (e.g. 15 for 1.15 pm.)
 * @returns The created Date object.
 */
function createDate(
  year: number,
  month: number,
  day: number,
  hour?: number,
  minute?: number
) {
  return new Date(year, month - 1, day, hour ?? 0, minute ?? 0);
}

/**
 * Test date to use in tests.  Note that our tests are configured in the
 * package.json to always run in the Pacific timezone, for testing consistency.
 * So this Date represents 2020/03/01 3.15 AM in UTC but 2020/02/29 7.15 PM in local (Pacific) timezone.
 * So depending which formatting function you use, you'll get back a different date.
 */
const MARCH_2_2020_3_AM_UTC = new Date("2020-03-02T03:00:00Z");

describe("date formatting", () => {
  const testDate = MARCH_2_2020_3_AM_UTC;

  test("Date in ISO format", () => {
    expect(formatDateTime(testDate, DateFormat.YYYY_MM_DD)).toBe("2020-03-01");
  });

  test("Slash separated date", () => {
    expect(formatDateTime(testDate, DateFormat.MM_DD_YYYY)).toBe("03/01/2020");
  });

  test("Date in full month, day, year", () => {
    expect(formatDateTime(testDate, DateFormat.MMMM_D_YYYY)).toBe(
      "March 1, 2020"
    );
  });

  test("Date in shorthand month, day, year", () => {
    expect(formatDateTime(testDate, DateFormat.MMM_DD_YYYY)).toBe(
      "Mar 01, 2020"
    );
  });

  test("Date in full month and unpadded day", () => {
    expect(formatDateTime(testDate, DateFormat.MMMM_D)).toBe("March 1");
  });
});

describe("utc time formatting", () => {
  const testDate = MARCH_2_2020_3_AM_UTC;

  test("Date in ISO format", () => {
    expect(formatUTCDateTime(testDate, DateFormat.YYYY_MM_DD)).toBe(
      "2020-03-02"
    );
  });

  test("Slash separated date", () => {
    expect(formatUTCDateTime(testDate, DateFormat.MM_DD_YYYY)).toBe(
      "03/02/2020"
    );
  });

  test("Date in full month, day, year", () => {
    expect(formatUTCDateTime(testDate, DateFormat.MMMM_D_YYYY)).toBe(
      "March 2, 2020"
    );
  });

  test("Date in shorthand month, day, year", () => {
    expect(formatUTCDateTime(testDate, DateFormat.MMM_DD_YYYY)).toBe(
      "Mar 02, 2020"
    );
  });

  test("Date in full month and unpadded day", () => {
    expect(formatUTCDateTime(testDate, DateFormat.MMMM_D)).toBe("March 2");
  });
});

describe("date string parsing", () => {
  test("ISO format to date object", () => {
    expect(parseDateString("2020-03-01T03:15:00.000")).toEqual(
      createDate(2020, 3, 1, 3, 15)
    );
  });

  test("Date string to date object", () => {
    expect(parseDateString("2020-03-01")).toEqual(createDate(2020, 3, 1));
  });

  test("Invalid date string", () => {
    expect(() => parseDateString("Hello")).toThrow();
  });
});

// Unix time are expressed in milliseconds.
describe("unix time parsing", () => {
  test("unix time with non-zero minutes and seconds", () => {
    expect(parseDateUnix(1583080230000).toISOString()).toBe(
      "2020-03-01T16:30:30.000Z"
    );
  });
});

describe("add time", () => {
  test("Add hours", () => {
    expect(
      addTime(createDate(2020, 3, 1), 8, TimeUnit.HOURS).toISOString()
    ).toBe("2020-03-01T16:00:00.000Z");
  });

  test("Add minutes", () => {
    expect(
      addTime(createDate(2020, 3, 1), 10, TimeUnit.MINUTES).toISOString()
    ).toBe("2020-03-01T08:10:00.000Z");
  });

  test("Add days", () => {
    expect(addTime(createDate(2020, 3, 1), 5, TimeUnit.DAYS)).toEqual(
      createDate(2020, 3, 6)
    );
  });

  test("Add weeks", () => {
    expect(addTime(createDate(2020, 3, 1), 2, TimeUnit.WEEKS)).toEqual(
      createDate(2020, 3, 15)
    );
  });

  test("Add months", () => {
    expect(addTime(createDate(2020, 3, 1), 3, TimeUnit.MONTHS)).toEqual(
      createDate(2020, 6, 1)
    );
  });
});

describe("subtract time", () => {
  test("Subtract hours", () => {
    expect(
      subtractTime(createDate(2020, 3, 1), 8, TimeUnit.HOURS).toISOString()
    ).toBe("2020-03-01T00:00:00.000Z");
  });

  test("Subtract minutes", () => {
    expect(
      subtractTime(createDate(2020, 3, 1), 10, TimeUnit.MINUTES).toISOString()
    ).toBe("2020-03-01T07:50:00.000Z");
  });

  test("Subtract days", () => {
    expect(subtractTime(createDate(2020, 3, 1), 5, TimeUnit.DAYS)).toEqual(
      createDate(2020, 2, 25)
    );
  });

  test("Subtract weeks", () => {
    expect(subtractTime(createDate(2020, 3, 1), 2, TimeUnit.WEEKS)).toEqual(
      createDate(2020, 2, 16)
    );
  });

  test("Subtract months", () => {
    expect(subtractTime(createDate(2020, 3, 1), 3, TimeUnit.MONTHS)).toEqual(
      createDate(2019, 12, 1)
    );
  });
});

describe("get start of time", () => {
  test("Start of hour", () => {
    expect(getStartOf(createDate(2020, 3, 1, 2, 30), TimeUnit.HOURS)).toEqual(
      createDate(2020, 3, 1, 2, 0)
    );
  });

  test("Start of day", () => {
    expect(getStartOf(createDate(2020, 3, 1, 8, 30), TimeUnit.DAYS)).toEqual(
      createDate(2020, 3, 1, 0, 0)
    );
  });

  // Start of week test will need to be adjusted when implementing Luxon migration as
  // moment treats Sunday as start of week and luxon treats Monday as start of week.
  // Currently, no start of week function calls are implemented.
  test("Start of week", () => {
    expect(getStartOf(createDate(2020, 3, 5), TimeUnit.WEEKS)).toEqual(
      createDate(2020, 3, 2)
    );
  });

  test("Start of month", () => {
    expect(getStartOf(createDate(2020, 3, 15), TimeUnit.MONTHS)).toEqual(
      createDate(2020, 3, 1)
    );
  });
});

describe("get time difference", () => {
  test("Negative difference in hours", () => {
    expect(
      getTimeDiff(
        createDate(2020, 3, 1),
        createDate(2020, 3, 1, 8),
        TimeUnit.HOURS
      )
    ).toEqual(-8);
  });

  test("Positive difference in hours", () => {
    expect(
      getTimeDiff(
        createDate(2020, 3, 1, 15),
        createDate(2020, 3, 1, 10),
        TimeUnit.HOURS
      )
    ).toEqual(5);
  });

  test("Negative difference in days", () => {
    expect(
      getTimeDiff(createDate(2020, 3, 1), createDate(2020, 3, 5), TimeUnit.DAYS)
    ).toEqual(-4);
  });

  test("Positive difference in days", () => {
    expect(
      getTimeDiff(
        createDate(2020, 3, 10),
        createDate(2020, 3, 7),
        TimeUnit.DAYS
      )
    ).toEqual(3);
  });

  test("Negative difference in weeks", () => {
    expect(
      getTimeDiff(
        createDate(2020, 3, 1),
        createDate(2020, 3, 15),
        TimeUnit.WEEKS
      )
    ).toEqual(-2);
  });

  test("Positive difference in weeks", () => {
    expect(
      getTimeDiff(
        createDate(2020, 3, 29),
        createDate(2020, 3, 15),
        TimeUnit.WEEKS
      )
    ).toEqual(2);
  });

  test("Negative difference in months", () => {
    expect(
      getTimeDiff(
        createDate(2020, 3, 1),
        createDate(2020, 6, 1),
        TimeUnit.MONTHS
      )
    ).toEqual(-3);
  });

  test("Positive difference in months", () => {
    expect(
      getTimeDiff(
        createDate(2020, 11, 1),
        createDate(2020, 6, 1),
        TimeUnit.MONTHS
      )
    ).toEqual(5);
  });
});

describe("isoDateOnlyString", () => {
  test("isoDateOnlyString removes hours, minutes and seconds.", () => {
    expect(isoDateOnlyString(new Date(2020, 3, 2, 10, 30))).toBe("2020-04-02");
  });
});
