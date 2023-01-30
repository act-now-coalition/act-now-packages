import fetch, { Response } from "node-fetch";
import pRetry from "p-retry";

/** Options passed to fetchJson() or fetchText() controlling fetch behavior. */
interface FetchOptions {
  /** How many times to retry errors before giving up. Default: 3 */
  retries?: number;
}

const DEFAULT_RETRIES = 3;

/**
 * Fetches JSON from the specified URL.
 *
 * @param url URL to fetch JSON from.
 * @param options Options to configure fetching behavior.
 * @returns The fetched JSON.
 */
export async function fetchJson<T = unknown>(
  url: string,
  options?: FetchOptions
): Promise<T> {
  return fetchData(url, (response) => response.json(), options);
}

/**
 * Fetches the text from the specified URL.
 *
 * @param url URL to fetch text from.
 * @param options Options to configure fetching behavior.
 * @returns The fetched text.
 */
export async function fetchText(
  url: string,
  options?: FetchOptions
): Promise<string> {
  return fetchData(url, (response) => response.text(), options);
}

/**
 * Helper to fetch data from a URL, implementing retry logic, etc.
 *
 * @param url URL to fetch from.
 * @param responseHandler A handler for the fetch response, e.g. to call
 * response.json() on it. This will be included within the retry handling logic so
 * if it fails, it will be retried.
 * @param options Options to configure fetching behavior.
 * @returns The result of calling the responseHandler() on the fetched data.
 */
function fetchData<T>(
  url: string,
  responseHandler: (response: Response) => Promise<T>,
  options?: FetchOptions
): Promise<T> {
  const fetcher = async () => {
    const response = await fetchWrapper(url);
    return responseHandler(response);
  };

  return pRetry(fetcher, {
    retries: options?.retries ?? DEFAULT_RETRIES,

    onFailedAttempt: (error) => {
      console.warn(`Failed to fetch ${url}: ${error}`);
      console.warn(`${error.retriesLeft} retries left.`);
    },
  });
}

/**
 * fetch() wrapper with some added error handling.
 *
 * @param url URL to fetch.
 * @returns The fetch response.
 */
async function fetchWrapper(url: string): Promise<Response> {
  // TODO(michael): Have some way to turn diagnostic logging on/off.
  console.log("Fetching", url);
  const response = await fetch(url);
  if (response.status !== 200) {
    const text = await response.text();
    throw new Error(
      `Error fetching data from ${url}. Code=${response.status}: ${text}`
    );
  }
  return response;
}
