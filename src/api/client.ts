const apiBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL ?? "";

type QueryValue = string | number | boolean | undefined;

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  params?: Record<string, QueryValue>;
  body?: unknown;
  headers?: Record<string, string>;
  accessToken?: string;
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
  const headers: Record<string, string> = {
    ...options?.headers,
  };

  if (options?.body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  if (options?.accessToken) {
    headers.Authorization = `Bearer ${options.accessToken}`;
  }

  const response = await fetch(buildUrl(path, options?.params), {
    method: options?.method ?? "GET",
    headers,
    body: options?.body === undefined ? undefined : JSON.stringify(options.body),
    signal: options?.signal,
  });

  if (!response.ok) {
    let detail = `API request failed: ${response.status}`;

    try {
      const errorBody = (await response.json()) as { detail?: string };
      detail = errorBody.detail ?? detail;
    } catch {
      // Ignore non-JSON error bodies.
    }

    throw new Error(detail);
  }

  return response.json() as Promise<T>;
}
