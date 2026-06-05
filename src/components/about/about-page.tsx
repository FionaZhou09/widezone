"use client";

import { CatalogFooter } from "@/components/catalog/catalog-footer";
import { CompanyCapabilities } from "@/components/catalog/company-capabilities";
import { DistributionNetwork } from "@/components/catalog/distribution-network";
import { PartnershipCta } from "@/components/catalog/partnership-cta";
import { useCatalogLocale } from "@/components/catalog/use-catalog-locale";
import { AboutHeader } from "./about-header";

export function AboutPage() {
  const [locale, setLocale] = useCatalogLocale();
  return (
    <div className="catalog-theme min-h-svh bg-[var(--catalog-cream)] text-[var(--catalog-forest)]">
      <AboutHeader locale={locale} onLocaleChange={setLocale} />
      <CompanyCapabilities locale={locale} />
      <DistributionNetwork locale={locale} />
      <PartnershipCta locale={locale} />
      <CatalogFooter locale={locale} />
    </div>
  );
}
