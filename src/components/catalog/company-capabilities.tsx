import { BadgeCheck, Boxes, MapPinned, ThermometerSnowflake } from "lucide-react";
import { CapabilityPhotoGrid } from "@/components/about/capability-photo-grid";
import { copy, type CatalogLocale } from "./i18n";

export function CompanyCapabilities({ locale }: { locale: CatalogLocale }) {
  const text = copy[locale];
  const capabilities = [
    { icon: MapPinned, title: text.locationTitle, body: text.locationBody },
    { icon: Boxes, title: text.technologyTitle, body: text.technologyBody },
    { icon: ThermometerSnowflake, title: text.qualityTitle, body: text.qualityBody },
  ];

  return (
    <section className="bg-white py-16 sm:py-24" id="about-company">
      <div className="mx-auto grid max-w-[1180px] gap-10 px-5 sm:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--catalog-green)]">{text.capabilityEyebrow}</span>
          <h2 className="mt-4 max-w-xl font-serif text-3xl font-bold leading-tight text-[var(--catalog-forest)] sm:text-5xl">{text.capabilityTitle}</h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--catalog-muted)]">{text.capabilityBody}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-[var(--catalog-forest)] p-5 text-white"><strong className="font-serif text-4xl">87,500</strong><span className="mt-2 block text-xs text-white/55">{text.facilitySize}</span></div>
            <div className="rounded-2xl border border-[var(--catalog-border)] bg-[var(--catalog-cream)] p-5"><BadgeCheck className="size-5 text-[var(--catalog-green)]" /><strong className="mt-4 block text-sm text-[var(--catalog-forest)]">{text.certification}</strong><span className="mt-1 block text-xs text-[var(--catalog-muted)]">{text.certificationStatus}</span></div>
          </div>
        </div>
        <CapabilityPhotoGrid locale={locale} />
      </div>
      <div className="mx-auto mt-12 grid max-w-[1180px] gap-3 px-5 sm:px-10 md:grid-cols-3">
        {capabilities.map(({ icon: Icon, title, body }) => (
          <article className="rounded-2xl border border-[var(--catalog-border)] bg-[var(--catalog-cream)] p-6" key={title}>
            <Icon className="size-5 text-[var(--catalog-green)]" />
            <h3 className="mt-5 font-serif text-lg font-bold text-[var(--catalog-forest)]">{title}</h3>
            <p className="mt-3 text-xs leading-6 text-[var(--catalog-muted)]">{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
