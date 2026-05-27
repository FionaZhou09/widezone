import { auth } from "@eazo/sdk";

/**
 * Drop-in replacement for `fetch` that automatically injects `x-eazo-session`
 * and parses JSON responses.
 */
export async function request<T = any>(
  input: RequestInfo | URL,
  init: RequestInit = {},
): Promise<T> {
  const sessionHeader = await auth.getSessionHeader();

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
