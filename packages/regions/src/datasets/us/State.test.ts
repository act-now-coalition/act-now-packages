import { State } from "./State";
import { County } from "./County";

describe("State", () => {
  test("contains county", () => {
    const washingtonState = new State("Washington", "53", 7614893, "WA");
    const kingCountyWA = new County(
      "King County",
      "53033",
      2252782,
      washingtonState
    );
    expect(washingtonState.contains(kingCountyWA)).toBe(true);
  });
});
