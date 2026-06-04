// Local-dev friendly auth wrapper.
// In production (Eazo), we delegate to @eazo/sdk/server.requireAuth.
// When Eazo env vars are missing (local demo), we fall back to a stub user
// so the app can run without tokens or a private key.

export type User = {
  id: string;
  name?: string | null;
  email?: string | null;
  avatarUrl?: string | null;
};

export type AuthResult =
  | { ok: true; user: User }
  | { ok: false; response: Response };

const hasEazoEnv =
  !!process.env.EAZO_PRIVATE_KEY &&
  !!process.env.EAZO_APP_ID;

let realRequireAuth: ((req: Request) => Promise<AuthResult>) | null = null;

if (hasEazoEnv) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/no-unsafe-assignment
    const sdk = require("@eazo/sdk/server") as {
      requireAuth: (req: Request) => Promise<AuthResult>;
    };
    realRequireAuth = sdk.requireAuth;
  } catch {
    realRequireAuth = null;
  }
}

export async function requireAuth(request: Request): Promise<AuthResult> {
  if (realRequireAuth) {
    return realRequireAuth(request);
  }

  // Local fallback: always "logged in" as a demo user.
  return {
    ok: true,
    user: {
      id: "local-demo-user",
      name: "Local Demo User",
      email: "demo@example.com",
    },
  };
}
