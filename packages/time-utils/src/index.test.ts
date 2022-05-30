import { assert } from "./index";

describe("assert", () => {
  test("throws an error if condition is falsy", () => {
    expect(() => assert(false)).toThrow();
    expect(() => assert(0)).toThrow();
    expect(() => assert(undefined)).toThrow();
    expect(() => assert(null)).toThrow();
    expect(() => assert("")).toThrow();
  });

  test("pass if condition is truthy", () => {
    expect(() => assert(true)).not.toThrow();
    expect(() => assert(1)).not.toThrow();
  });
});
