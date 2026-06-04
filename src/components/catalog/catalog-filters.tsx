import { Search } from "lucide-react";
import { categoryLabels, copy, type CatalogLocale } from "./i18n";
import type { DisplayCategory } from "./types";

type CatalogFiltersProps = {
  categories: DisplayCategory[];
  activeCategory: string;
  search: string;
  onCategoryChange: (category: string) => void;
  onSearchChange: (search: string) => void;
  locale: CatalogLocale;
};

export function CatalogFilters({
  categories,
  activeCategory,
  search,
  onCategoryChange,
  onSearchChange,
  locale,
}: CatalogFiltersProps) {
  const text = copy[locale];
  return (
    <div className="mx-auto max-w-[1180px] px-5 pt-10 sm:px-10 sm:pt-14">
      <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div><span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--catalog-green)]">{text.catalogEyebrow}</span><h2 className="mt-2 font-serif text-3xl font-bold text-[var(--catalog-forest)]">{text.catalogTitle}</h2></div>
        <p className="max-w-md text-xs leading-5 text-[var(--catalog-muted)]">{text.catalogBody}</p>
      </div>
      <label className="flex items-center rounded-2xl border border-[var(--catalog-border)] bg-white shadow-[0_12px_35px_rgba(20,70,48,0.07)] focus-within:border-[var(--catalog-green)]">
        <Search className="ml-4 size-4 text-[var(--catalog-muted)]" aria-hidden="true" />
        <span className="sr-only">{text.search}</span>
        <input
          className="min-w-0 flex-1 bg-transparent px-4 py-4 text-sm font-light outline-none placeholder:text-[var(--catalog-muted)]"
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={text.search}
          type="search"
          value={search}
        />
      </label>
      <div className="mt-7 flex flex-wrap gap-2" aria-label={text.categories}>
        <button
          className={activeCategory === "all" ? "catalog-tab-active" : "catalog-tab"}
          onClick={() => onCategoryChange("all")}
          type="button"
        >
          {text.all}
        </button>
        {categories.map((category) => (
          <button
            className={activeCategory === category.key ? "catalog-tab-active" : "catalog-tab"}
            key={category.key}
            onClick={() => onCategoryChange(category.key)}
            type="button"
          >
            {categoryLabels[category.key]?.[locale] ?? category.key}
          </button>
        ))}
      </div>
    </div>
  );
}
