'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { Locale, Localized } from '@/content/types';
import { dictionary, type Dictionary } from './dictionary';

const STORAGE_KEY = 'portfolio-locale';

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  /** Resolve um campo Localized para o idioma atual. */
  t: (value: Localized) => string;
  /** Dicionário de interface no idioma atual. */
  d: Dictionary;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function detectLocale(): Locale {
  if (typeof window === 'undefined') return 'pt';
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'pt' || stored === 'en') return stored;
  } catch {
    // localStorage indisponível (modo privado, cookies bloqueados)
  }
  const nav = window.navigator.language?.toLowerCase() ?? '';
  return nav.startsWith('pt') ? 'pt' : 'en';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Renderiza PT no servidor e ajusta no cliente, evitando mismatch de hidratação.
  const [locale, setLocaleState] = useState<Locale>('pt');

  useEffect(() => {
    setLocaleState(detectLocale());
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === 'pt' ? 'pt-BR' : 'en';
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // sem persistência: segue funcionando na sessão
    }
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale,
      toggleLocale: () => setLocale(locale === 'pt' ? 'en' : 'pt'),
      t: (localized: Localized) => localized[locale],
      d: dictionary[locale],
    }),
    [locale, setLocale],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage precisa estar dentro de <LanguageProvider>');
  return context;
}
