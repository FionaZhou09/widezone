import type { CatalogLocale } from "./i18n";

/**
 * Category banner artwork, keyed by the `category` field in
 * widezone-products.json. Alt text is bilingual because the catalogue is —
 * a screen reader in Chinese should not fall back to English descriptions.
 *
 * These are genre images for the category, not photographs of specific stock.
 * Product-level photography lives on the individual product cards.
 */
export type CategoryImage = {
  src: string;
  alt: Record<CatalogLocale, string>;
};

export const categoryImages: Record<string, CategoryImage> = {
  Beef: {
    src: "/categories/beef.webp",
    alt: {
      zh: "深色石板上的带雪花纹路的生牛排",
      en: "A marbled raw ribeye steak resting on dark slate",
    },
  },
  Poultry: {
    src: "/categories/poultry.webp",
    alt: {
      zh: "深色陶盘上的整只生鸡",
      en: "A whole raw chicken on a dark ceramic plate",
    },
  },
  "Lamb & Goat": {
    src: "/categories/lamb-goat.webp",
    alt: {
      zh: "深色石板上剔骨整齐的生羊排",
      en: "A frenched rack of lamb standing on dark slate",
    },
  },
  Pork: {
    src: "/categories/pork.webp",
    alt: {
      zh: "深色木板上层次分明的生五花肉",
      en: "A raw pork belly slab with layered fat on a dark board",
    },
  },
  Seafood: {
    src: "/categories/seafood.webp",
    alt: {
      zh: "碎冰上排列的带头生虎虾",
      en: "Head-on tiger prawns arranged on crushed ice",
    },
  },
  "Hotpot Base & Sauces": {
    src: "/categories/hotpot-base-sauces.webp",
    alt: {
      zh: "深色陶碗中飘着干辣椒的红油火锅底料",
      en: "A dark bowl of red chilli hotpot broth with dried chillies",
    },
  },
  "Noodles & Vermicelli": {
    src: "/categories/noodles-vermicelli.webp",
    alt: {
      zh: "深色石面上盘绕的干面条",
      en: "A coiled nest of dried wheat noodles on dark stone",
    },
  },
  "Other / Snacks & Beverages": {
    src: "/categories/snacks-beverages.webp",
    alt: {
      zh: "深色台面上的玻璃瓶与盛放干货的小碟",
      en: "Glass bottles and small dishes of dried snacks on a dark surface",
    },
  },
};

export function getCategoryImage(key: string): CategoryImage | undefined {
  return categoryImages[key];
}
