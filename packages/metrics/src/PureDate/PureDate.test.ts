import { PureDate } from "./PureDate";

describe("PureDate", () => {
  test("isValid", () => {
    expect(PureDate.isValid(new Date("2021-01-01"))).toBe(true);
    expect(PureDate.isValid(new Date("2021-01-01 00:00:00 PST"))).toBe(false);
    expect(PureDate.isValid(new Date("2021-01-01 00:00:00 UTC"))).toBe(true);
  });

  test("addDays", () => {
    expect(new PureDate("2020-01-01").addDays(1)).toEqual(
      new PureDate("2020-01-02")
    );
    expect(new PureDate("2020-01-01").addDays(-1)).toEqual(
      new PureDate("2019-12-31")
    );

    // Daylight savings started 2020-03-08. Make sure it doesn't cause an issue.
    expect(new PureDate("2020-03-06").addDays(4)).toEqual(
      new PureDate("2020-03-10")
    );

    // Arbitrary large delta
    expect(new PureDate("1850-01-01").addDays(100000)).toEqual(
      new PureDate("2123-10-17")
    );
  });

  test("next", () => {
    expect(new PureDate("2020-01-01").next).toEqual(new PureDate("2020-01-02"));
  });

  test("prev", () => {
    expect(new PureDate("2020-01-01").prev).toEqual(new PureDate("2019-12-31"));
  });
});
