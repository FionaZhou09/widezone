"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import type { CatalogLocale } from "./i18n";

const LOCALE_STORAGE_KEY = "widezone:catalog-locale";
const DEFAULT_LOCALE: CatalogLocale = "zh";

type CatalogLocaleContextValue = {
  locale: CatalogLocale;
  setLocale: (locale: CatalogLocale) => void;
};

const CatalogLocaleContext = createContext<CatalogLocaleContextValue | null>(null);

function isCatalogLocale(value: string | null): value is CatalogLocale {
  return value === "zh" || value === "en";
}

function getInitialLocale(): CatalogLocale {
  if (typeof window === "undefined") {
    return DEFAULT_LOCALE;
  }

  const storedLocale = readStoredLocale();

  return isCatalogLocale(storedLocale) ? storedLocale : DEFAULT_LOCALE;
}

function readStoredLocale() {
  try {
    return window.localStorage?.getItem(LOCALE_STORAGE_KEY) ?? null;
  } catch {
    return null;
  }
}

function writeStoredLocale(locale: CatalogLocale) {
  try {
    window.localStorage?.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // Language still persists across client-side route changes via context.
  }
}

export function CatalogLocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<CatalogLocale>(getInitialLocale);

  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-Hans" : "en";
  }, [locale]);

  const setLocale = useCallback((nextLocale: CatalogLocale) => {
    setLocaleState(nextLocale);
    writeStoredLocale(nextLocale);
  }, []);

  return (
    <CatalogLocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </CatalogLocaleContext.Provider>
  );
}

export function useCatalogLocale() {
  const context = useContext(CatalogLocaleContext);

  if (!context) {
    throw new Error("useCatalogLocale must be used inside CatalogLocaleProvider");
  }

  const { locale, setLocale } = context;

  return [locale, setLocale] as const;
}
