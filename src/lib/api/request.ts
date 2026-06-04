import { auth } from "@eazo/sdk";

/**
 * Drop-in replacement for `fetch` that automatically injects `x-eazo-session`
 * and parses JSON responses.
 */
export async function request<T = any>(
  input: RequestInfo | URL,
  init: RequestInit = {},
): Promise<T> {
  let sessionHeader: string | null | undefined;
  try {
    sessionHeader = await auth.getSessionHeader();
  } catch {
    // Local dev outside Eazo host: no session header available.
    sessionHeader = undefined;
  }

  const response = await fetch(input, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init.headers,
      ...(sessionHeader ? { "x-eazo-session": sessionHeader } : {}),
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Request failed" }));
    throw new Error(error.error || `Request failed with status ${response.status}`);
  }

  return response.json();
}
