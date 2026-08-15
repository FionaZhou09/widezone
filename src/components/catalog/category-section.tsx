import Image from "next/image";
import { ProductCard } from "./product-card";
import type { CatalogProduct, DisplayCategory } from "./types";
import { categoryLabels, copy, type CatalogLocale } from "./i18n";
import { getCategoryImage } from "./category-images";

export function CategorySection({
  category,
  index,
  selectedKeys,
  onToggle,
  locale,
}: {
  category: DisplayCategory;
  index: number;
  selectedKeys: Set<string>;
  onToggle: (product: CatalogProduct) => void;
  locale: CatalogLocale;
}) {
  const text = copy[locale];
  const title = categoryLabels[category.key]?.[locale] ?? category.key;
  const image = getCategoryImage(category.key);

  return (
    <section
      className="catalog-section mb-16"
      style={{ animationDelay: `${Math.min(index * 0.06, 0.36)}s` }}
    >
      {image ? (
        <div className="relative mb-5 aspect-[16/6] w-full overflow-hidden rounded-2xl sm:aspect-[16/5]">
          <Image
            alt={image.alt[locale]}
            className="object-cover"
            fill
            // The first banner is above the fold on the catalogue route.
            priority={index === 0}
            sizes="(max-width: 768px) 100vw, (max-width: 1180px) 100vw, 1120px"
            src={image.src}
          />
          {/* Scrim: concentrated on the left so the heading stays legible, then
              clearing by ~60% so the artwork itself still reads. The images are
              already dark, so a heavy full-width overlay turns them to mud. */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(8,55,38,0.92) 0%, rgba(8,55,38,0.55) 26%, rgba(8,55,38,0) 60%)",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-between gap-3 px-5 sm:px-8">
            <div className="flex items-center gap-3">
              <span className="h-7 w-1.5 shrink-0 rounded-full bg-[var(--catalog-lime)]" />
              <h2 className="font-serif text-xl font-bold text-white drop-shadow-sm sm:text-3xl">
                {title}
              </h2>
            </div>
            <span className="shrink-0 rounded-full border border-white/25 bg-black/25 px-3 py-1 text-[10px] font-semibold tracking-wider text-white backdrop-blur">
              {category.products.length} {text.productsCount}
            </span>
          </div>
        </div>
      ) : (
        <div className="mb-5 flex items-center gap-3">
          <span className="h-7 w-1.5 shrink-0 rounded-full bg-[var(--catalog-green)]" />
          <h2 className="font-serif text-xl font-bold text-[var(--catalog-forest)] sm:text-2xl">
            {title}
          </h2>
          <span className="ml-auto rounded-full border border-[var(--catalog-border)] bg-white px-3 py-1 text-[10px] font-semibold tracking-wider text-[var(--catalog-muted)]">
            {category.products.length} {text.productsCount}
          </span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 md:grid-cols-[repeat(auto-fill,minmax(260px,1fr))]">
        {category.products.map((product) => (
          <ProductCard
            key={`${product.name_en}-${product.unit}`}
            onToggle={onToggle}
            product={product}
            selected={selectedKeys.has(product.name_en)}
            locale={locale}
          />
        ))}
      </div>
    </section>
  );
}
