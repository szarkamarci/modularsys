import { DemoScenarioConfig, OverviewData } from '../../features/overview/types';
import { FrequentItemsData, ProductInsightData, SearchAnalyticsData, WatchlistData } from '../../lib/data/types';

export const SUPPORTED_LOCALES = ['hu', 'en'] as const;
export type AppLocale = typeof SUPPORTED_LOCALES[number];

export type LocaleConfig = {
  locale: AppLocale;
  label: string;
  shortLabel: string;
  topBar: {
    userName: string;
    searchPlaceholder: string;
    pagesLabel: string;
    resultsLabel: string;
    noResults: string;
    logout: string;
  };
  demoRetailScenario: DemoScenarioConfig;
  demoRetailOverviewData: OverviewData;
  searchAnalyticsData: SearchAnalyticsData;
  productInsightsData: ProductInsightData;
  frequentItemsData: FrequentItemsData;
  watchlistData: WatchlistData;
};

export function isSupportedLocale(value: string): value is AppLocale {
  return SUPPORTED_LOCALES.includes(value as AppLocale);
}
