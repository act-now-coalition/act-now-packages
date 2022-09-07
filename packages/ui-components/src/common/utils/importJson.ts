/** Cache used by importJson(). */

let cachedImports: { [cacheToken: string]: Promise<any> } = {};

/**
 * Helper for importing JSON dynamically that handles caching the import() promise and
 * extracting the default export where the JSON lives.
 *
 * Usage: importJson('foo', import('./foo.json'))
 *
 * @param cacheToken An arbitrary token used to cache the promise. Must be unique.
 * @param importPromise The promise returned from a import('foo/bar.json') call.
 */
export default function importJson<T>(
  cacheToken: string,
  importPromise: Promise<{ default: T }>
): Promise<T> {
  cachedImports[cacheToken] =
    cachedImports[cacheToken] || importPromise.then((module) => module.default);
  return cachedImports[cacheToken];
}
