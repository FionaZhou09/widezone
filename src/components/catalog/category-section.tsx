import { ProductCard } from "./product-card";
import type { CatalogProduct, DisplayCategory } from "./types";
import { categoryLabels, copy, type CatalogLocale } from "./i18n";

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
  return (
    <section
      className="catalog-section mb-16"
      style={{ animationDelay: `${Math.min(index * 0.06, 0.36)}s` }}
    >
      <div className="mb-5 flex items-center gap-3">
        <span className="h-7 w-1.5 shrink-0 rounded-full bg-[var(--catalog-green)]" />
        <h2 className="font-serif text-xl font-bold text-[var(--catalog-forest)] sm:text-2xl">{categoryLabels[category.key]?.[locale] ?? category.key}</h2>
        <span className="ml-auto rounded-full border border-[var(--catalog-border)] bg-white px-3 py-1 text-[10px] font-semibold tracking-wider text-[var(--catalog-muted)]">
          {category.products.length} {text.productsCount}
        </span>
      </div>
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
