import { throwError, validate } from "./index";

describe("validate", () => {
  test("throws an error if condition is falsy", () => {
    const errorMsg = "Error message";
    expect(() => validate(false)).toThrow();
    expect(() => validate(0)).toThrow();
    expect(() => validate(undefined)).toThrow();
    expect(() => validate(null)).toThrow();
    expect(() => validate("")).toThrow();
    expect(() => validate(false, errorMsg)).toThrowError(errorMsg);
  });

  test("pass if condition is truthy", () => {
    expect(() => validate(true)).not.toThrow();
    expect(() => validate(1)).not.toThrow();
  });
});

describe("throwActNowJsError", () => {
  const errorMsg = "Error message";
  test("throws an error with the given message", () => {
    expect(() => throwError()).toThrow();
    expect(() => throwError(errorMsg)).toThrowError(errorMsg);
  });
});
