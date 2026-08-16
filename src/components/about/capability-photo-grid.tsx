import Image from "next/image";
import { MapPin } from "lucide-react";
import { copy, type CatalogLocale } from "@/components/catalog/i18n";

const photos = [
  {
    src: "/products/kagoshima-a5-rib-cap-polished.webp",
    alt: "Packaged Kagoshima Japanese A5 rib cap steaks",
    position: "object-center",
  },
  {
    src: "/products/gold-fresh-shrimp-hl-21-25-polished.webp",
    alt: "Gold Fresh frozen shrimp",
    position: "object-center",
  },
  {
    src: "/products/thomas-foods-lamb-leg-polished.webp",
    alt: "Thomas Foods boneless lamb leg",
    position: "object-center",
  },
];

export function CapabilityPhotoGrid({ locale }: { locale: CatalogLocale }) {
  const text = copy[locale];
  return (
    <div className="overflow-hidden rounded-[2rem] border border-[var(--catalog-border)] bg-[var(--catalog-mint)] p-2 shadow-[0_24px_60px_rgba(20,70,48,0.12)]">
      <div className="flex items-center justify-between gap-4 px-3 py-3 sm:px-4">
        <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-[var(--catalog-forest)]">
          {text.selectedProducts}
        </span>
        <span className="hidden h-px flex-1 bg-[var(--catalog-forest)]/10 sm:block" aria-hidden="true" />
      </div>

      <div className="grid min-h-[420px] grid-cols-2 gap-2 overflow-hidden rounded-[1.55rem]">
        {photos.map((photo, index) => (
          <div className={`relative overflow-hidden bg-white ${index === 0 ? "row-span-2" : ""}`} key={photo.src}>
            <Image
              alt={photo.alt}
              className={`object-cover contrast-[1.03] saturate-[1.02] transition-transform duration-500 motion-reduce:transition-none hover:scale-[1.025] ${photo.position}`}
              fill
              quality={90}
              sizes="(max-width: 1024px) 50vw, 360px"
              src={photo.src}
            />
          </div>
        ))}
      </div>

      <div className="m-2 mt-3 flex items-center gap-3 rounded-2xl bg-[var(--catalog-forest)] px-4 py-3.5 text-white sm:px-5">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/10" aria-hidden="true">
          <MapPin className="size-4 text-[var(--catalog-lime)]" />
        </span>
        <div className="min-w-0">
          <span className="block text-[9px] font-bold uppercase tracking-[0.22em] text-[var(--catalog-lime)]">
            {text.headquarters}
          </span>
          <strong className="mt-1 block text-xs font-semibold leading-5 sm:text-sm">
            2701 Simpson St · Monroe, NC 28110
          </strong>
        </div>
      </div>
    </div>
  );
}
