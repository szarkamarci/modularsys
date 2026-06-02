import { enLocale } from '../locales/en';
import { huLocale } from '../locales/hu';
import { AppLocale, isSupportedLocale, LocaleConfig, SUPPORTED_LOCALES } from '../locales/types';

export const DEFAULT_LOCALE: AppLocale = 'hu';
export { SUPPORTED_LOCALES, isSupportedLocale };
export type { AppLocale, LocaleConfig };

const localeConfigs: Record<AppLocale, LocaleConfig> = {
  hu: huLocale,
  en: enLocale,
};

export function normalizeLocale(locale?: string): AppLocale {
  return locale && isSupportedLocale(locale) ? locale : DEFAULT_LOCALE;
}

export function getLocaleConfig(locale?: string): LocaleConfig {
  return localeConfigs[normalizeLocale(locale)];
}

export function getDemoRetailScenario(locale?: string) {
  return getLocaleConfig(locale).demoRetailScenario;
}

export function getDemoRetailOverviewData(locale?: string) {
  return getLocaleConfig(locale).demoRetailOverviewData;
}

export function getSearchAnalyticsData(locale?: string) {
  return getLocaleConfig(locale).searchAnalyticsData;
}

export function getProductInsightsData(locale?: string) {
  return getLocaleConfig(locale).productInsightsData;
}

export function getFrequentItemsData(locale?: string) {
  return getLocaleConfig(locale).frequentItemsData;
}

export function getWatchlistData(locale?: string) {
  return getLocaleConfig(locale).watchlistData;
}

export const demoRetailScenario = getDemoRetailScenario(DEFAULT_LOCALE);
export const demoRetailRoutePaths = demoRetailScenario.routes.map((route) => route.href);
