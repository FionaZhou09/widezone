export type CatalogProduct = {
  name_en: string;
  name_zh: string;
  unit: string;
};

export type CatalogCategory = {
  category: string;
  products: CatalogProduct[];
};

export type DisplayCategory = CatalogCategory & {
  key: string;
};

export type RfqItem = CatalogProduct & {
  quantity: string;
};
