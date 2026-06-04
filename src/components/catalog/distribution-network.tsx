import { ArrowRight, MapPin } from "lucide-react";
import { copy, type CatalogLocale } from "./i18n";

export function DistributionNetwork({ locale }: { locale: CatalogLocale }) {
  const text = copy[locale];
  return (
    <section className="bg-[var(--catalog-forest)] py-16 text-white sm:py-24">
      <div className="mx-auto grid max-w-[1180px] gap-12 px-5 sm:px-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--catalog-lime)]">{text.networkEyebrow}</span>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-5xl">{text.networkTitle}</h2>
          <p className="mt-5 text-sm leading-7 text-white/55">{text.networkBody}</p>
        </div>
        <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2">
          {["NY", "NC", "GA"].map((state, index) => (
            <div className="contents" key={state}>
              <div className={`rounded-2xl border p-4 text-center ${state === "NC" ? "border-[var(--catalog-lime)] bg-[var(--catalog-lime)] text-[var(--catalog-forest)]" : "border-white/15 bg-white/5"}`}>
                <MapPin className="mx-auto size-5" /><strong className="mt-3 block font-serif text-2xl">{state}</strong><span className="mt-1 block text-[9px] uppercase tracking-wider opacity-60">{state === "NC" ? "Monroe Hub" : "Market"}</span>
              </div>
              {index < 2 ? <ArrowRight className="size-4 text-[var(--catalog-lime)]" /> : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
