import { parseBoolean } from "./data_utils";

describe("data_utils", () => {
  test("parseBoolean accepts valid boolean-y values", () => {
    expect(parseBoolean("true")).toBe(true);
    expect(parseBoolean("True")).toBe(true);
    expect(parseBoolean("yes")).toBe(true);
    expect(parseBoolean("Yes")).toBe(true);
    expect(parseBoolean(1)).toBe(true);
    expect(parseBoolean("false")).toBe(false);
    expect(parseBoolean("False")).toBe(false);
    expect(parseBoolean("no")).toBe(false);
    expect(parseBoolean("No")).toBe(false);
    expect(parseBoolean(0)).toBe(false);
  });

  test("parseBoolean rejects invalid values", () => {
    expect(() => {
      parseBoolean("string");
    }).toThrow(`Cannot coerce string to boolean.`);
    expect(() => {
      parseBoolean(null);
    }).toThrow(`Cannot coerce null to boolean.`);
    expect(() => {
      parseBoolean(undefined);
    }).toThrow(`Cannot coerce undefined to boolean.`);
    expect(() => {
      parseBoolean(Number.NaN);
    }).toThrow(`Cannot coerce NaN to boolean.`);
    expect(() => {
      parseBoolean(100);
    }).toThrow(`Cannot coerce 100 to boolean.`);
  });
});
