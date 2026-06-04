import Image from "next/image";
import { copy, type CatalogLocale } from "@/components/catalog/i18n";

const photos = [
  { src: "/products/kagoshima-a5-rib-cap.jpg", alt: "Kagoshima Japanese A5 Rib Cap" },
  { src: "/products/gold-fresh-shrimp-hl-21-25.png", alt: "Gold Fresh Frozen Shrimp" },
  { src: "/products/thomas-foods-lamb-leg.jpg", alt: "Thomas Foods Lamb Leg" },
];

export function CapabilityPhotoGrid({ locale }: { locale: CatalogLocale }) {
  const text = copy[locale];
  return (
    <div className="relative grid min-h-[420px] grid-cols-2 gap-2 overflow-hidden rounded-[2rem] bg-[var(--catalog-mint)] p-2 shadow-[0_24px_60px_rgba(20,70,48,0.14)]">
      {photos.map((photo, index) => (
        <div className={`relative overflow-hidden rounded-[1.5rem] ${index === 0 ? "row-span-2" : ""}`} key={photo.src}>
          <Image alt={photo.alt} className="object-cover transition-transform duration-500 hover:scale-105" fill sizes="(max-width: 1024px) 50vw, 300px" src={photo.src} />
        </div>
      ))}
      <div className="absolute bottom-5 left-5 rounded-2xl border border-white/15 bg-[var(--catalog-forest)]/95 px-5 py-4 text-white shadow-xl backdrop-blur">
        <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-[var(--catalog-lime)]">{text.headquarters}</span>
        <strong className="mt-2 block text-sm leading-6">2701 Simpson St<br />Monroe, NC 28110</strong>
      </div>
    </div>
  );
}
