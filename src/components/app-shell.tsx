"use client";

import { usePathname } from "next/navigation";
import { DesktopSidebar, MobileTabBar } from "@/components/navigation";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPublicCatalog = pathname === "/catalog" || pathname === "/about";

  if (isPublicCatalog) {
    return <main className="min-h-svh">{children}</main>;
  }

  return (
    <>
      <div className="flex flex-1">
        <DesktopSidebar />
        <main className="flex-1 pb-16 md:ml-64 md:pb-0">{children}</main>
      </div>
      <MobileTabBar />
    </>
  );
}
