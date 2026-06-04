import type { CatalogProduct } from "./types";
import { copy, type CatalogLocale } from "./i18n";

export function ProductCard({
  product,
  selected,
  onToggle,
  locale,
}: {
  product: CatalogProduct;
  selected: boolean;
  onToggle: (product: CatalogProduct) => void;
  locale: CatalogLocale;
}) {
  const text = copy[locale];
  return (
    <article className={`group flex min-h-48 flex-col rounded-2xl border bg-white p-5 transition-all hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(20,70,48,0.1)] ${selected ? "border-[var(--catalog-green)] ring-2 ring-[var(--catalog-mint)]" : "border-[var(--catalog-border)]"}`}>
      <div className="mb-5 flex items-center justify-between"><span className="grid size-9 place-items-center rounded-xl bg-[var(--catalog-mint)] text-sm font-bold text-[var(--catalog-green)]">WZ</span>{selected ? <span className="rounded-full bg-[var(--catalog-mint)] px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-[var(--catalog-green)]">{text.selected}</span> : null}</div>
      <h3 className="font-serif text-base font-bold leading-snug text-[var(--catalog-forest)]">
        {locale === "zh" ? product.name_zh : product.name_en}
      </h3>
      {product.unit ? (
        <span className="mt-3 inline-block self-start rounded-full bg-[var(--catalog-mint)] px-2.5 py-1 text-[10px] font-semibold tracking-wide text-[var(--catalog-green)]">
          {product.unit}
        </span>
      ) : null}
      <button
        className={`mt-auto block w-full rounded-xl border px-3 py-2.5 text-[11px] font-semibold tracking-wide transition-colors ${
          selected
            ? "border-[var(--catalog-green)] bg-[var(--catalog-green)] text-white"
            : "border-[var(--catalog-border)] text-[var(--catalog-green)] hover:border-[var(--catalog-green)] hover:bg-[var(--catalog-mint)]"
        }`}
        onClick={() => onToggle(product)}
        type="button"
      >
        {selected ? text.added : text.add}
      </button>
    </article>
  );
}
