"use client";

import Link from "next/link";
import { CatalogFooter } from "@/components/catalog/catalog-footer";
import { copy } from "@/components/catalog/i18n";
import { useCatalogLocale } from "@/components/catalog/use-catalog-locale";

export function ContactPage() {
  const [locale, setLocale] = useCatalogLocale();
  const text = copy[locale];

  return (
    <div className="catalog-theme min-h-svh bg-[#f5f2ea] text-[var(--catalog-forest)]">
      <header className="contact-luxury-shell text-white">
        <div className="contact-noise" />
        <div className="relative mx-auto max-w-[1180px] px-4 pb-20 pt-5 sm:px-10 sm:pb-28">
          <nav className="contact-fluid-nav">
            <Link className="flex min-w-0 items-center gap-3" href="/about">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[var(--catalog-lime)] font-serif text-lg font-black text-[var(--catalog-forest)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.45)]">广</span>
              <span className="min-w-0">
                <strong className="block truncate text-sm font-black tracking-wide">{text.brand}</strong>
                <span className="hidden text-[9px] uppercase tracking-[0.32em] text-white/45 sm:block">
                  {locale === "zh" ? "销售与合作咨询" : "Sales & partnerships"}
                </span>
              </span>
            </Link>

            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-5 text-xs font-semibold text-white/60 md:flex">
                <Link className="contact-nav-link" href="/about">{text.navAbout}</Link>
                <Link className="contact-nav-link" href="/catalog">{text.navCatalog}</Link>
              </div>
              <div aria-label="Language" className="contact-language-toggle" role="group">
                <button aria-pressed={locale === "zh"} className={locale === "zh" ? "is-active" : ""} onClick={() => setLocale("zh")} type="button">中文</button>
                <button aria-pressed={locale === "en"} className={locale === "en" ? "is-active" : ""} onClick={() => setLocale("en")} type="button">English</button>
              </div>
            </div>
          </nav>

          <div className="grid gap-8 pt-20 md:grid-cols-[1.05fr_0.95fr] md:items-end md:pt-28">
            <section className="contact-reveal">
              <span className="contact-eyebrow">{text.contactEyebrow}</span>
              <h1 className="mt-6 max-w-3xl font-serif text-[clamp(3rem,7vw,6rem)] font-black leading-[0.96] tracking-normal">
                {text.contactTitle}
              </h1>
              <p className="mt-7 max-w-2xl text-sm leading-7 text-white/68 sm:text-base">
                {text.contactBody}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a className="contact-primary-button group" href="mailto:fiona.zhou@widezones.com">
                  <span>{text.emailSales}</span>
                  <span className="contact-button-orbit" aria-hidden="true">↗</span>
                </a>
                <Link className="contact-secondary-button group" href="/catalog#catalog-products">
                  <span>{text.startRfq}</span>
                  <span className="contact-button-orbit" aria-hidden="true">↗</span>
                </Link>
              </div>
            </section>

            <aside className="contact-hero-plate contact-reveal" style={{ animationDelay: "120ms" }}>
              <div className="contact-hero-core">
                <span className="text-[10px] font-black uppercase tracking-[0.24em] text-[var(--catalog-lime)]">Wide Zone Food</span>
                <div className="mt-14 grid gap-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.22em] text-white/68">{text.contactSales}</span>
                    <strong className="mt-3 block text-2xl font-black text-white">Fiona Zhou</strong>
                    <a className="mt-2 block text-sm text-white/62 transition-colors duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-white" href="mailto:fiona.zhou@widezones.com">
                      fiona.zhou@widezones.com
                    </a>
                  </div>
                  <div className="contact-hairline" />
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.22em] text-white/68">{text.contactAddress}</span>
                    <strong className="mt-3 block text-lg font-black leading-7 text-white">
                      2701 Simpson St<br />Monroe, NC 28110
                    </strong>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-[1180px] gap-5 px-4 py-20 sm:px-10 sm:py-28 lg:grid-cols-[1.15fr_0.85fr]">
        <section className="contact-info-shell contact-reveal">
          <div className="contact-info-core">
            <span className="contact-light-eyebrow">{text.contactEyebrow}</span>
            <h2 className="mt-5 max-w-2xl font-serif text-4xl font-black leading-tight sm:text-6xl">{text.contactTitle}</h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-[var(--catalog-muted)]">{text.contactBody}</p>
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              <div className="contact-mini-card">
                <span>{text.contactSales}</span>
                <strong>Fiona Zhou</strong>
                <a href="mailto:fiona.zhou@widezones.com">fiona.zhou@widezones.com</a>
              </div>
              <div className="contact-mini-card">
                <span>{text.contactAddress}</span>
                <strong>{text.contactAddress}</strong>
                <p>2701 Simpson St<br />Monroe, NC 28110</p>
              </div>
            </div>
          </div>
        </section>

        <aside className="contact-rfq-shell contact-reveal" style={{ animationDelay: "120ms" }}>
          <div className="contact-rfq-core">
            <span className="contact-eyebrow">{text.startRfq}</span>
            <h2 className="mt-5 font-serif text-3xl font-black leading-tight sm:text-4xl">{text.contactNext}</h2>
            <p className="mt-5 text-sm leading-7 text-white/62">{text.contactNextBody}</p>
            <Link className="contact-primary-button group mt-9" href="/catalog#catalog-products">
              <span>{text.startRfq}</span>
              <span className="contact-button-orbit" aria-hidden="true">↗</span>
            </Link>
          </div>
        </aside>
      </main>
      <CatalogFooter locale={locale} />
    </div>
  );
}
