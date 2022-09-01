import { renderHook } from "@testing-library/react-hooks";

import { useCachedArrayIfEqual } from "./useCachedArrayIfEqual";

describe("useCachedArrayIfEqual()", () => {
  test("example", () => {
    // Render with an initial array.
    const initialArray = ["testing"];
    const { result, rerender } = renderHook(
      ({ array }) => useCachedArrayIfEqual(array),
      {
        initialProps: {
          array: initialArray,
        },
      }
    );
    expect(result.current).toBe(initialArray);

    // Re-render with a different array instance but the same values.
    // Should still return the original array instance.
    rerender({ array: ["testing"] });
    expect(result.current).toBe(initialArray);

    // Re-render with a different array instance and different values.
    const newArray = ["testing", "new"];
    rerender({ array: newArray });
    expect(result.current).toBe(newArray);

    // Re-render with a different array instance but same values again.
    // Should still return the original array instance.
    rerender({ array: ["testing", "new"] });
    expect(result.current).toBe(newArray);
  });
});
