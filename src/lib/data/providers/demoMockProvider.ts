import { DashboardDataProvider } from '../DashboardDataProvider';
import {
  getDemoRetailOverviewData,
  getFrequentItemsData,
  getProductInsightsData,
  getSearchAnalyticsData,
  getWatchlistData,
  normalizeLocale
} from '../../../config/scenarios/demo-retail';
import { getDemoOverviewData } from '../../../config/scenarios/demo-cases';

function getLocaleFromParams(params: unknown) {
  if (params && typeof params === 'object' && 'locale' in params) {
    const locale = (params as { locale?: unknown }).locale;
    return typeof locale === 'string' ? normalizeLocale(locale) : normalizeLocale();
  }
  return normalizeLocale();
}

export const demoMockProvider: DashboardDataProvider = {
  async getOverviewData(params?: unknown) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const scenarioId = params && typeof params === 'object' && 'scenarioId' in params
      ? (params as { scenarioId?: unknown }).scenarioId
      : undefined;
    return getDemoOverviewData(typeof scenarioId === 'string' ? scenarioId : undefined, getLocaleFromParams(params));
  },

  async getInventoryPredictions() {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 600));
    return [
      {
        id: '1',
        productId: 'PRD-001',
        name: 'Organic Arabica Coffee Beans',
        current_stock: 45,
        recommended_purchase: 120,
        unit: 'kg'
      },
      {
        id: '2',
        productId: 'PRD-002',
        name: 'Premium Oat Milk',
        current_stock: 12,
        recommended_purchase: 50,
        unit: 'L'
      },
      {
        id: '3',
        productId: 'PRD-003',
        name: 'Artisan Sourdough Bread',
        current_stock: 5,
        recommended_purchase: 25,
        unit: 'pcs'
      },
      {
        id: '4',
        productId: 'PRD-004',
        name: 'Avocado',
        current_stock: 150,
        recommended_purchase: 50,
        unit: 'pcs'
      }
    ];
  },

  async getDeadStock() {
    await new Promise(resolve => setTimeout(resolve, 400));
    return [
      {
        id: '1',
        productId: 'PRD-099',
        name: 'Seasonal Pumpkin Spice Syrup',
        last_sold: '2025-12-01T00:00:00Z',
        current_stock: 12,
        unit: 'btl'
      },
      {
        id: '2',
        productId: 'PRD-102',
        name: 'Obsolete Packaging Boxes',
        last_sold: null,
        current_stock: 500,
        unit: 'pcs'
      }
    ];
  },

  async getSearchAnalytics(params?: unknown) {
    await new Promise(resolve => setTimeout(resolve, 260));
    return getSearchAnalyticsData(getLocaleFromParams(params));
  },

  async getFrequentItems(params?: unknown) {
    await new Promise(resolve => setTimeout(resolve, 260));
    return getFrequentItemsData(getLocaleFromParams(params));
  },

  async getWatchlist(params?: unknown) {
    await new Promise(resolve => setTimeout(resolve, 260));
    return getWatchlistData(getLocaleFromParams(params));
  },

  async getProductInsights(params?: unknown) {
    await new Promise(resolve => setTimeout(resolve, 260));
    return getProductInsightsData(getLocaleFromParams(params));
  },
};
