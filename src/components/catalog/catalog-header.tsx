import Link from "next/link";
import { ArrowDown, CheckCircle2, Mail, PackageCheck, Truck } from "lucide-react";
import { copy, type CatalogLocale } from "./i18n";

export function CatalogHeader({ locale, onLocaleChange }: { locale: CatalogLocale; onLocaleChange: (locale: CatalogLocale) => void }) {
  const text = copy[locale];
  return (
    <header className="catalog-pattern overflow-hidden bg-[var(--catalog-forest)] text-white">
      <div className="relative z-10 mx-auto max-w-[1180px] px-5 pb-8 pt-5 sm:px-10 sm:pb-12">
        <nav className="flex items-center justify-between border-b border-white/10 pb-5">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-[var(--catalog-lime)] font-serif text-lg font-black text-[var(--catalog-forest)]">广</span>
            <div>
              <strong className="block text-sm tracking-wide">{text.brand}</strong>
              <span className="text-[10px] uppercase tracking-[0.25em] text-white/50">{locale === "zh" ? "亚洲食品专业供应商" : "Asian Food Wholesale Supply"}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-5 text-xs font-semibold text-white/65 md:flex">
              <Link className="transition-colors hover:text-white" href="/about">{text.navAbout}</Link>
              <a className="text-white" href="#catalog-products">{text.navCatalog}</a>
            </div>
            <div className="flex rounded-full border border-white/15 bg-white/5 p-1 text-[10px] font-bold">
              <button className={`rounded-full px-3 py-1.5 ${locale === "zh" ? "bg-[var(--catalog-lime)] text-[var(--catalog-forest)]" : "text-white/60"}`} onClick={() => onLocaleChange("zh")} type="button">中文</button>
              <button className={`rounded-full px-3 py-1.5 ${locale === "en" ? "bg-[var(--catalog-lime)] text-[var(--catalog-forest)]" : "text-white/60"}`} onClick={() => onLocaleChange("en")} type="button">English</button>
            </div>
            <a aria-label={text.contactSales} className="hidden items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold transition-colors hover:bg-white/10 sm:flex" href="mailto:fiona.zhou@widezones.com">
              <Mail className="size-3.5 text-[var(--catalog-lime)]" /> {text.contactSales}
            </a>
          </div>
        </nav>

        <div className="grid gap-10 py-12 md:grid-cols-[1.35fr_0.65fr] md:items-end md:py-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--catalog-lime)]/25 bg-[var(--catalog-lime)]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--catalog-lime)]">
              <CheckCircle2 className="size-3.5" /> {text.trusted}
            </span>
            <h1 className="mt-6 max-w-3xl font-serif text-4xl font-bold leading-[1.06] sm:text-6xl">
              {text.heroLead}
              <span className="block text-[var(--catalog-lime)]">{text.heroAccent}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
              {text.heroBody}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="inline-flex items-center rounded-full bg-[var(--catalog-lime)] px-5 py-3 text-xs font-bold text-[var(--catalog-forest)] transition-transform hover:-translate-y-0.5" href="/about">
                {text.navAbout}
              </Link>
              <a className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-xs font-semibold text-white transition-colors hover:bg-white/10" href="#catalog-products">
                {text.browse} <ArrowDown className="size-4" />
              </a>
              <a className="inline-flex items-center rounded-full border border-white/20 px-5 py-3 text-xs font-semibold text-white transition-colors hover:bg-white/10" href="mailto:fiona.zhou@widezones.com">
                {text.contactTeam}
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="catalog-stat-card"><PackageCheck /><strong>100+</strong><span>{text.curated}</span></div>
            <div className="catalog-stat-card"><Truck /><strong>8</strong><span>{text.categories}</span></div>
            <div className="catalog-stat-card col-span-2"><CheckCircle2 /><strong>B2B</strong><span>{text.builtFor}</span></div>
          </div>
        </div>
      </div>
    </header>
  );
}
