"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { es, type TranslationKeys } from "./locales/es";
import { ca } from "./locales/ca";
import { en } from "./locales/en";

export type Locale = "es" | "ca" | "en";

const dictionaries: Record<Locale, TranslationKeys> = { es, ca, en };

interface TranslationContextValue {
  locale: Locale;
  t: TranslationKeys;
  setLocale: (locale: Locale) => void;
}

const TranslationContext = createContext<TranslationContextValue>({
  locale: "es",
  t: es,
  setLocale: () => {},
});

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "es";
  try {
    const stored = document.cookie
      .split("; ")
      .find((c) => c.startsWith("locale="))
      ?.split("=")[1];
    if (stored && stored in dictionaries) return stored as Locale;
  } catch {}
  return "es";
}

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    document.cookie = `locale=${newLocale};path=/;max-age=31536000`;
    document.documentElement.lang = newLocale;
  }, []);

  return (
    <TranslationContext.Provider
      value={{ locale, t: dictionaries[locale], setLocale }}
    >
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  return useContext(TranslationContext);
}
