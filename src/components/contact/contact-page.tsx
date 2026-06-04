"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { AboutHeader } from "@/components/about/about-header";
import { CatalogFooter } from "@/components/catalog/catalog-footer";
import { copy, type CatalogLocale } from "@/components/catalog/i18n";

export function ContactPage() {
  const [locale, setLocale] = useState<CatalogLocale>("zh");
  const text = copy[locale];

  return (
    <div className="catalog-theme min-h-svh bg-[var(--catalog-cream)] text-[var(--catalog-forest)]">
      <AboutHeader locale={locale} onLocaleChange={setLocale} />
      <main className="mx-auto grid max-w-[1180px] gap-5 px-5 py-16 sm:px-10 sm:py-24 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-[2rem] bg-white p-7 sm:p-12">
          <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--catalog-green)]">{text.contactEyebrow}</span>
          <h1 className="mt-5 max-w-2xl font-serif text-4xl font-bold leading-tight sm:text-6xl">{text.contactTitle}</h1>
          <p className="mt-6 max-w-xl text-sm leading-7 text-[var(--catalog-muted)]">{text.contactBody}</p>
          <a className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--catalog-green)] px-5 py-3 text-xs font-bold text-white" href="mailto:fiona.zhou@widezones.com"><Mail className="size-4" />{text.emailSales}<ArrowUpRight className="size-4" /></a>
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-[var(--catalog-mint)] p-5"><Mail className="size-5 text-[var(--catalog-green)]" /><strong className="mt-4 block text-sm">Fiona Zhou</strong><span className="mt-1 block text-xs text-[var(--catalog-muted)]">fiona.zhou@widezones.com</span></div>
            <div className="rounded-2xl bg-[var(--catalog-mint)] p-5"><MapPin className="size-5 text-[var(--catalog-green)]" /><strong className="mt-4 block text-sm">{text.contactAddress}</strong><span className="mt-1 block text-xs leading-5 text-[var(--catalog-muted)]">2701 Simpson St<br />Monroe, NC 28110</span></div>
          </div>
        </section>
        <aside className="rounded-[2rem] bg-[var(--catalog-forest)] p-7 text-white sm:p-10">
          <h2 className="font-serif text-3xl font-bold">{text.contactNext}</h2>
          <p className="mt-5 text-sm leading-7 text-white/60">{text.contactNextBody}</p>
          <Link className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--catalog-lime)] px-5 py-3 text-xs font-bold text-[var(--catalog-forest)]" href="/catalog#catalog-products">{text.startRfq}<ArrowUpRight className="size-4" /></Link>
        </aside>
      </main>
      <CatalogFooter locale={locale} />
    </div>
  );
}
