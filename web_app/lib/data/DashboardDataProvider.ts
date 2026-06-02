import {
  InventoryPrediction,
  DeadStockItem,
  SearchAnalyticsData,
  FrequentItemPair,
  WatchlistItem,
  ProductInsightData,
  FrequentItemsData,
  WatchlistData,
  OverviewData
} from './types';

export interface DashboardDataProvider {
  getOverviewData(params?: unknown): Promise<OverviewData>;
  getInventoryPredictions(params?: unknown): Promise<InventoryPrediction[]>;
  getDeadStock(params?: unknown): Promise<DeadStockItem[]>;
  getSearchAnalytics(params?: unknown): Promise<SearchAnalyticsData>;
  getFrequentItems(params?: unknown): Promise<FrequentItemsData>;
  getWatchlist(params?: unknown): Promise<WatchlistData>;
  getProductInsights(params?: unknown): Promise<ProductInsightData>;
}
