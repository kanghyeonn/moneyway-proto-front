const apiBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL ?? "";

type QueryValue = string | number | boolean | undefined;

type RequestOptions = {
  params?: Record<string, QueryValue>;
  signal?: AbortSignal;
};

const buildUrl = (path: string, params?: Record<string, QueryValue>) => {
  const url = new URL(`${apiBaseUrl}${path}`, "http://localhost");

  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  });

  if (apiBaseUrl) {
    return url.toString();
  }

  return `${url.pathname}${url.search}`;
};

export async function fetchJson<T>(path: string, options?: RequestOptions) {
  const response = await fetch(buildUrl(path, options?.params), {
    signal: options?.signal,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}
