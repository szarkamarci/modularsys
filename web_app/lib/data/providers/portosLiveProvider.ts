import { DashboardDataProvider } from '../DashboardDataProvider';

export const portosLiveProvider: DashboardDataProvider = {
  async getOverviewData() { throw new Error('Not implemented'); },
  async getInventoryPredictions() { throw new Error('Not implemented'); },
  async getDeadStock() { throw new Error('Not implemented'); },
  async getSearchAnalytics() { throw new Error('Not implemented'); },
  async getFrequentItems() { throw new Error('Not implemented'); },
  async getWatchlist() { throw new Error('Not implemented'); },
  async getProductInsights() { throw new Error('Not implemented'); },
};
