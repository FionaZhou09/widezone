import Link from "next/link";
import { copy, type CatalogLocale } from "./i18n";

export function CatalogFooter({ locale }: { locale: CatalogLocale }) {
  return (
    <footer className="bg-[var(--catalog-forest)] px-6 py-8 text-center text-[10px] uppercase tracking-[0.18em] text-white/50">
      {copy[locale].footer}{" "}
      <Link className="text-[var(--catalog-lime)] hover:text-white" href="/contact">{copy[locale].contactSales}</Link>
    </footer>
  );
}
