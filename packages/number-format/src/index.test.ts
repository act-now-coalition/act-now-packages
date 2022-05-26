import {
  formatInteger,
  formatDecimal,
  formatPercent,
  formatMillions,
  formatBillions,
} from "./index";

describe("numberFormatUtils", () => {
  describe("formatInteger", () => {
    test("Round to the closest integer", () => {
      expect(formatInteger(1.1)).toBe("1");
      expect(formatInteger(1.9)).toBe("2");
      expect(formatInteger(15_599)).toBe("15,599");
      expect(formatInteger(15599)).toBe("15,599");
    });
  });

  describe("formatDecimal", () => {
    test("Value to decimal string", () => {
      expect(formatDecimal(1.2345)).toBe("1.23");
      expect(formatDecimal(1.9)).toBe("1.9");
      expect(formatDecimal(0)).toBe("0");
    });
    test("Value to decimal string with decimal places specified", () => {
      expect(formatDecimal(1.2345, 3)).toBe("1.235");
      expect(formatDecimal(1.2345, 1)).toBe("1.2");
      expect(formatDecimal(0, 3)).toBe("0");
    });
  });

  describe("formatPercent", () => {
    test("Value to percentage string", () => {
      expect(formatPercent(0.1234)).toBe("12%");
      expect(formatPercent(1.2345)).toBe("123%");
      expect(formatPercent(-0.4321)).toBe("-43%");
      expect(formatPercent(0)).toBe("0%");
    });
    test("Value to percentage string with decimal places specified", () => {
      expect(formatPercent(0.1234, 1)).toBe("12.3%");
      expect(formatPercent(0.1234, 2)).toBe("12.34%");
      expect(formatPercent(0.1234, 3)).toBe("12.34%");
    });
  });

  describe("formatMillions", () => {
    test("rounds to 2 decimals by default", () => {
      expect(formatMillions(1_555_000)).toBe("1.56");
    });
    test("respects the formatting options", () => {
      expect(formatMillions(1_555_000, { minimumFractionDigits: 3 })).toBe(
        "1.555"
      );
      expect(formatMillions(1_555_000, { maximumFractionDigits: 1 })).toBe(
        "1.6"
      );
      expect(formatMillions(1_555_000, { maximumSignificantDigits: 3 })).toBe(
        "1.56"
      );
      expect(formatMillions(1_555_000, { minimumSignificantDigits: 4 })).toBe(
        "1.555"
      );
    });
  });

  describe("formatBillions", () => {
    test("rounds to 2 decimals by default", () => {
      expect(formatBillions(1_888_000_000)).toBe("1.89");
    });
    test("respects the formatting options", () => {
      expect(formatBillions(1_888_000_000, { minimumFractionDigits: 3 })).toBe(
        "1.888"
      );
      expect(formatBillions(1_888_000_000, { maximumFractionDigits: 1 })).toBe(
        "1.9"
      );
      expect(
        formatBillions(1_888_000_000, { maximumSignificantDigits: 3 })
      ).toBe("1.89");
      expect(
        formatBillions(1_888_000_000, { minimumSignificantDigits: 4 })
      ).toBe("1.888");
    });
  });
});
