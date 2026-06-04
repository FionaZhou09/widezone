import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { EazoProvider } from "@eazo/sdk/react";
import { cn } from "@/utils/utils";
import { Toaster } from "@/components/ui/sonner";
import { UserSyncEffect } from "@/components/user-profile/user-sync-effect";
import { AppShell } from "@/components/app-shell";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-heading" });

const SITE_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : undefined;

export const metadata: Metadata = {
  ...(SITE_URL ? { metadataBase: new URL(SITE_URL) } : {}),
  title: "广隆源食品 CRM / Wide Zone Food CRM",
  description: "Internal sales CRM for Wide Zone Food to track pipeline stages, custom restaurant pricing, and real-time team collaboration.",
  icons: {
    icon: "https://eazo.ai/favicon.ico",
  },
  openGraph: {
    type: "website",
    siteName: "Wide Zone Food CRM",
    title: "广隆源食品 CRM / Wide Zone Food CRM",
    description: "Internal sales CRM for Wide Zone Food to track pipeline stages, custom restaurant pricing, and real-time team collaboration.",
  },
  twitter: {
    card: "summary_large_image",
    title: "广隆源食品 CRM / Wide Zone Food CRM",
    description: "Internal sales CRM for Wide Zone Food to track pipeline stages, custom restaurant pricing, and real-time team collaboration.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#2E5A35",
};

const eazoAppId = process.env.EAZO_APP_ID;
const isEazoHosted = !!eazoAppId;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full antialiased", inter.variable, plusJakarta.variable)}>
      <body className="min-h-svh flex flex-col bg-[#F5F7F5]">
        {isEazoHosted ? (
          <EazoProvider>
            <UserSyncEffect />
            <AppShell>{children}</AppShell>
            <Toaster />
          </EazoProvider>
        ) : (
          <>
            <AppShell>{children}</AppShell>
            <Toaster />
          </>
        )}
      </body>
    </html>
  );
}
