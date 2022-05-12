import { assert, fail } from "./index";

describe("assert", () => {
  test("throws an error if condition is falsy", () => {
    const errorMsg = "Error message";
    expect(() => assert(false)).toThrow();
    expect(() => assert(0)).toThrow();
    expect(() => assert(undefined)).toThrow();
    expect(() => assert(null)).toThrow();
    expect(() => assert("")).toThrow();
    expect(() => assert(false, errorMsg)).toThrowError(errorMsg);
  });

  test("pass if condition is truthy", () => {
    expect(() => assert(true)).not.toThrow();
    expect(() => assert(1)).not.toThrow();
  });
});

describe("fail", () => {
  const errorMsg = "Error message";
  test("throws an error with the given message", () => {
    expect(() => fail()).toThrow();
    expect(() => fail(errorMsg)).toThrowError(errorMsg);
  });
});
