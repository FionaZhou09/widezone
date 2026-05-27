import { UserBadge } from "@/components/user-profile/user-badge";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background">
      <header className="absolute right-4 top-4 z-10">
        <UserBadge />
      </header>
      <main className="flex min-h-screen items-center justify-center p-8">
        <div className="max-w-xl text-center space-y-3">
          <h1 className="text-2xl font-semibold">Eazo App Template</h1>
          <p className="text-sm text-muted-foreground">
            Replace this page with your product UI. See AGENTS.md for guidance.
          </p>
        </div>
      </main>
    </div>
  );
}
