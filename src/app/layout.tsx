import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-heading" });

const SITE_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : undefined;

export const metadata: Metadata = {
  ...(SITE_URL ? { metadataBase: new URL(SITE_URL) } : {}),
  title: "广隆源食品 / Wide Zone Food",
  description: "Wholesale food distributor catalog with bilingual product listings and online RFQ for restaurants and retailers.",
  openGraph: {
    type: "website",
    siteName: "Wide Zone Food",
    title: "广隆源食品 / Wide Zone Food",
    description: "Wholesale food distributor catalog with bilingual product listings and online RFQ for restaurants and retailers.",
  },
  twitter: {
    card: "summary_large_image",
    title: "广隆源食品 / Wide Zone Food",
    description: "Wholesale food distributor catalog with bilingual product listings and online RFQ for restaurants and retailers.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#2E5A35",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full antialiased", inter.variable, plusJakarta.variable)}>
      <body className="min-h-svh flex flex-col bg-[#F5F7F5]">
        <main className="min-h-svh flex-1">{children}</main>
      </body>
    </html>
  );
}
