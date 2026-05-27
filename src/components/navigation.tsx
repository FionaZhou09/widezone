"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Package } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "仪表盘", labelEn: "Dashboard", icon: LayoutDashboard },
  { href: "/customers", label: "客户", labelEn: "Customers", icon: Users },
  { href: "/catalog", label: "产品", labelEn: "Catalog", icon: Package },
];

export function MobileTabBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#D2DFD6] pb-[env(safe-area-inset-bottom)] md:hidden z-20">
      <div className="grid grid-cols-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center py-2 px-4 text-xs font-medium transition-colors",
                isActive
                  ? "text-[#2E5A35] bg-[#F5F7F5]"
                  : "text-[#7A9682] hover:text-[#3B5E43]"
              )}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-[10px] font-semibold">
                {item.label} / {item.labelEn}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function DesktopSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 bg-white border-r border-[#D2DFD6] z-20">
      <div className="flex flex-col h-full">
        <div className="p-6 border-b border-[#D2DFD6]">
          <h1 className="text-lg font-bold text-[#2E5A35]">
            广隆源食品
          </h1>
          <p className="text-xs text-[#7A9682] mt-1">Wide Zone Food CRM</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-[#2E5A35] text-white"
                    : "text-[#3B5E43] hover:bg-[#F5F7F5]"
                )}
              >
                <Icon className="w-5 h-5" />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">{item.label}</span>
                  <span className="text-xs opacity-80">{item.labelEn}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#D2DFD6] text-xs text-[#7A9682]">
          <p className="font-semibold">Internal Sales Tool</p>
          <p className="mt-1">Team collaboration enabled</p>
        </div>
      </div>
    </aside>
  );
}
