import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import { CatalogLocaleProvider } from "@/components/catalog/use-catalog-locale";

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-heading" });

/**
 * Canonical origin for absolute URLs in metadata (Open Graph images,
 * canonical links, sitemap entries).
 *
 * Resolution order:
 *   1. NEXT_PUBLIC_SITE_URL  — set this to the production domain.
 *   2. URL                   — provided automatically by Netlify.
 *   3. VERCEL_URL            — provided automatically by Vercel.
 *   4. The known production URL, as a last resort.
 *
 * Previously this read VERCEL_URL only. The site deploys to Netlify, where
 * that variable is never set, so metadataBase was undefined in production and
 * the Open Graph image resolved against a relative path — every shared link
 * rendered a blank preview card.
 */
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
  "https://fionasale.netlify.app";

const TITLE = "广隆源食品 / Wide Zone Food";
const DESCRIPTION =
  "Wholesale food distributor catalog with bilingual product listings and online RFQ for restaurants and retailers.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s | ${TITLE}`,
  },
  description: DESCRIPTION,
  applicationName: "Wide Zone Food",
  keywords: [
    "wholesale food distributor",
    "Asian food wholesale",
    "foodservice supplier North Carolina",
    "frozen seafood wholesale",
    "restaurant supplier Southeast",
    "亚洲食品批发",
    "广隆源食品",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Wide Zone Food",
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    locale: "zh_CN",
    alternateLocale: ["en_US"],
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Wide Zone Food — wholesale food distribution, Monroe NC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // maximumScale/userScalable previously blocked pinch-zoom. On a product
  // catalogue where buyers inspect food photography that is actively
  // unhelpful, and it fails WCAG 1.4.4 (Resize Text).
  themeColor: "#2E5A35",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Matches DEFAULT_LOCALE in use-catalog-locale.tsx. The provider updates
    // this on the client when the visitor switches language, but the
    // server-rendered value is what crawlers and the first paint see, so it
    // must reflect the default the page actually renders in.
    <html lang="zh-Hans" className={cn("h-full antialiased", plusJakarta.variable)}>
      <body className="min-h-svh flex flex-col bg-[#F5F7F5]">
        <CatalogLocaleProvider>
          <main className="min-h-svh flex-1">{children}</main>
        </CatalogLocaleProvider>
      </body>
    </html>
  );
}
