import {
  formatInteger,
  formatDecimal,
  formatPercent,
  formatMillions,
  formatBillions,
} from "./index";

describe("numberFormatUtils", () => {
  describe("formatInteger", () => {
    test("Rounds to the closest integer", () => {
      expect(formatInteger(1.1)).toBe("1");
      expect(formatInteger(1.9)).toBe("2");
      expect(formatInteger(15_599)).toBe("15,599");
      expect(formatInteger(15599)).toBe("15,599");
    });
  });

  describe("formatDecimal", () => {
    test("Value to decimal string, rounds to maximum of 2 decimal places by default", () => {
      expect(formatDecimal(1.2345)).toBe("1.23");
      expect(formatDecimal(1.9)).toBe("1.9");
      expect(formatDecimal(0)).toBe("0");
    });
    test("Respects places param when provided", () => {
      expect(formatDecimal(1.2345, 3)).toBe("1.235");
      expect(formatDecimal(1.2345, 1)).toBe("1.2");
      expect(formatDecimal(0, 3)).toBe("0");
    });
    test("Respects options param when provided", () => {
      expect(formatDecimal(1.2345, { minimumFractionDigits: 3 })).toBe("1.235");
      expect(formatDecimal(1.93, { maximumFractionDigits: 1 })).toBe("1.9");
      expect(formatDecimal(1.2345, { maximumSignificantDigits: 3 })).toBe(
        "1.23"
      );
      expect(formatDecimal(1.23, { minimumSignificantDigits: 4 })).toBe(
        "1.230"
      );
    });
  });

  describe("formatPercent", () => {
    test("Value to percentage string, rounds to whole integer by default", () => {
      expect(formatPercent(0.1234)).toBe("12%");
      expect(formatPercent(1.2345)).toBe("123%");
      expect(formatPercent(-0.4321)).toBe("-43%");
      expect(formatPercent(0)).toBe("0%");
    });
    test("Respects places param when provided", () => {
      expect(formatPercent(0.1234, 1)).toBe("12.3%");
      expect(formatPercent(0.1234, 2)).toBe("12.34%");
      expect(formatPercent(0.1234, 3)).toBe("12.34%");
    });
    test("Respects options param when provided", () => {
      expect(formatPercent(0.1234, { minimumFractionDigits: 3 })).toBe(
        "12.340%"
      );
      expect(formatPercent(0.1234, { maximumFractionDigits: 1 })).toBe("12.3%");
      expect(formatPercent(0.1234, { maximumSignificantDigits: 3 })).toBe(
        "12.3%"
      );
      expect(formatPercent(0.1234, { minimumSignificantDigits: 4 })).toBe(
        "12.34%"
      );
    });
  });

  describe("formatMillions", () => {
    test("Rounds to 2 decimal places by default", () => {
      expect(formatMillions(1_555_000)).toBe("1.56");
    });
    test("Respects places param when provided", () => {
      expect(formatMillions(1_555_000, 3)).toBe("1.555");
      expect(formatMillions(1_555_000, 1)).toBe("1.6");
      expect(formatMillions(1_555_000, 2)).toBe("1.56");
      expect(formatMillions(1_555_000, 0)).toBe("2");
    });
    test("Respects options param when provided", () => {
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
    test("Rounds to 2 decimal places by default", () => {
      expect(formatBillions(1_888_000_000)).toBe("1.89");
    });
    test("Respects places param when provided", () => {
      expect(formatBillions(1_555_000_000, 3)).toBe("1.555");
      expect(formatBillions(1_555_000_000, 1)).toBe("1.6");
      expect(formatBillions(1_555_000_000, 2)).toBe("1.56");
      expect(formatBillions(1_555_000_000, 0)).toBe("2");
    });
    test("Respects options param when provided", () => {
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
