"use client";

import { useMemo, useState } from "react";
import catalogData from "@/data/widezone-products.json";
import { CatalogFilters } from "./catalog-filters";
import { CatalogFooter } from "./catalog-footer";
import { CatalogHeader } from "./catalog-header";
import { CategorySection } from "./category-section";
import { RfqTray } from "./rfq-tray";
import { PartnershipCta } from "./partnership-cta";
import type { CatalogCategory, CatalogProduct, DisplayCategory, RfqItem } from "./types";
import { copy, type CatalogLocale } from "./i18n";

const categories: DisplayCategory[] = (catalogData as CatalogCategory[]).map((category) => ({
  ...category,
  key: category.category,
}));

export function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [rfqItems, setRfqItems] = useState<RfqItem[]>([]);
  const [rfqOpen, setRfqOpen] = useState(false);
  const [submitted, setSubmitted] = useState("");
  const [locale, setLocale] = useState<CatalogLocale>("zh");
  const text = copy[locale];

  const visibleCategories = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();

    return categories
      .filter((category) => activeCategory === "all" || category.key === activeCategory)
      .map((category) => ({
        ...category,
        products: category.products.filter(
          (product) =>
            !query ||
            product.name_en.toLocaleLowerCase().includes(query) ||
            product.name_zh.toLocaleLowerCase().includes(query),
        ),
      }))
      .filter((category) => category.products.length > 0);
  }, [activeCategory, search]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setActiveCategory("all");
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setSearch("");
  };

  const handleToggleProduct = (product: CatalogProduct) => {
    setSubmitted("");
    setRfqItems((current) =>
      current.some((item) => item.name_en === product.name_en)
        ? current.filter((item) => item.name_en !== product.name_en)
        : [...current, { ...product, quantity: "" }],
    );
  };

  const selectedKeys = new Set(rfqItems.map((item) => item.name_en));

  return (
    <div className="catalog-theme min-h-svh bg-[var(--catalog-cream)] text-[var(--catalog-forest)]">
      <CatalogHeader locale={locale} onLocaleChange={setLocale} />
      <CatalogFilters
        activeCategory={activeCategory}
        categories={categories}
        onCategoryChange={handleCategoryChange}
        onSearchChange={handleSearchChange}
        search={search}
        locale={locale}
      />
      <main className="mx-auto max-w-[1180px] px-5 py-12 sm:px-10" id="catalog-products">
        {visibleCategories.length ? (
          visibleCategories.map((category, index) => (
            <CategorySection
              category={category}
              index={index}
              key={category.key}
              onToggle={handleToggleProduct}
              selectedKeys={selectedKeys}
              locale={locale}
            />
          ))
        ) : (
          <p className="py-16 text-center text-sm text-[var(--catalog-muted)]">
            {text.noResults}
          </p>
        )}
      </main>
      <PartnershipCta locale={locale} />
      <CatalogFooter locale={locale} />
      <RfqTray
        items={rfqItems}
        onOpenChange={setRfqOpen}
        onQuantityChange={(nameEn, quantity) =>
          setRfqItems((items) => items.map((item) => (item.name_en === nameEn ? { ...item, quantity } : item)))
        }
        onRemove={(nameEn) => setRfqItems((items) => items.filter((item) => item.name_en !== nameEn))}
        onSuccess={(developmentMode) => {
          setRfqItems([]);
          setSubmitted(
            developmentMode
              ? text.localSuccess
              : text.success,
          );
        }}
        open={rfqOpen}
        submitted={submitted}
        locale={locale}
      />
    </div>
  );
}
