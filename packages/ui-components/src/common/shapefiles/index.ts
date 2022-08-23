import { singletonHook } from "react-singleton-hook";
import { usePromise } from "../hooks";
import { importJson } from "../utils";

/** State shapes */

import statesGeographies from "./states-10m.json";
export { statesGeographies };

/** County shapes */

export type CountiesTopology = typeof import("./counties-10m.json");

function importCountyGeographies(): Promise<CountiesTopology> {
  return importJson("counties-10m", import("./counties-10m.json"));
}

export const useCountyGeographies = singletonHook({ pending: true }, () =>
  usePromise(importCountyGeographies())
);
