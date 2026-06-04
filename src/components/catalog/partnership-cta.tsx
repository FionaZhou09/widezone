import { ArrowUpRight } from "lucide-react";
import { copy, type CatalogLocale } from "./i18n";

export function PartnershipCta({ locale }: { locale: CatalogLocale }) {
  const text = copy[locale];
  return (
    <section className="bg-[var(--catalog-cream)] px-5 py-16 sm:px-10 sm:py-24">
      <div className="mx-auto max-w-[1180px] rounded-[2rem] bg-[var(--catalog-mint)] p-8 sm:p-14">
        <h2 className="max-w-2xl font-serif text-3xl font-bold text-[var(--catalog-forest)] sm:text-5xl">{text.readyTitle}</h2>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--catalog-muted)]">{text.readyBody}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a className="inline-flex items-center gap-2 rounded-full bg-[var(--catalog-green)] px-5 py-3 text-xs font-bold text-white" href="/catalog#catalog-products">{text.startRfq}<ArrowUpRight className="size-4" /></a>
          <a className="inline-flex items-center rounded-full border border-[var(--catalog-green)] px-5 py-3 text-xs font-bold text-[var(--catalog-green)]" href="mailto:fiona.zhou@widezones.com">Fiona Zhou · fiona.zhou@widezones.com</a>
        </div>
      </div>
    </section>
  );
}
