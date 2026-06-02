
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import {
  AppLocale,
  DEFAULT_LOCALE,
  getLocaleConfig,
  isSupportedLocale,
  LocaleConfig,
  SUPPORTED_LOCALES,
} from '../../config/scenarios/demo-retail';

const STORAGE_KEY = 'modularai.locale';

type LocaleContextValue = {
  locale: AppLocale;
  localeConfig: LocaleConfig;
  setLocale: (locale: AppLocale) => void;
  supportedLocales: readonly AppLocale[];
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<AppLocale>(DEFAULT_LOCALE);

  useEffect(() => {
    const storedLocale = window.localStorage.getItem(STORAGE_KEY);
    if (storedLocale && isSupportedLocale(storedLocale)) {
      setLocaleState(storedLocale);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    window.localStorage.setItem(STORAGE_KEY, locale);
  }, [locale]);

  const value = useMemo<LocaleContextValue>(() => ({
    locale,
    localeConfig: getLocaleConfig(locale),
    setLocale: setLocaleState,
    supportedLocales: SUPPORTED_LOCALES,
  }), [locale]);

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used inside LocaleProvider');
  }
  return context;
}
